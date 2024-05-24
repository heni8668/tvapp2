const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

async function main() {
  // Delete all records to start fresh
  await prisma.watchLater.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.movie.deleteMany();
  await prisma.channel.deleteMany();
  await prisma.category.deleteMany();
  await prisma.type.deleteMany();
  await prisma.user.deleteMany();

  // Create some initial channels
  const channels = await prisma.channel.createMany({
    data: [{ name: "HBO" }, { name: "Netflix" }, { name: "Disney+" }],
  });

  // Create some initial categories
  const categories = await prisma.category.createMany({
    data: [{ name: "Action", }, { name: "Comedy" }, { name: "Drama" }],
  });

  // Create some initial types
  const types = await prisma.type.createMany({
    data: [{ name: "Movie" }, { name: "Series" }, { name: "Documentary" }],
  });

  // Create some initial users
  const password = await bcrypt.hash("password", 10);
  const users = await prisma.user.createMany({
    data: [
      { username: "user1", email: "user1@example.com", password },
      { username: "user2", email: "user2@example.com", password },
    ],
  });

  // Fetch created channels, categories, types, and users
  const [hbo, netflix, disney] = await prisma.channel.findMany();
  const [action, comedy, drama] = await prisma.category.findMany();
  const [movieType, series, documentary] = await prisma.type.findMany();
  const [user1, user2] = await prisma.user.findMany();

  // Create some initial movies
  const movies = await prisma.movie.createMany({
    data: [
      {
        title: "Inception",
        duration: 148,
        videoUrl: "https://example.com/inception",
        channelId: hbo.id,
        categoryId: action.id,
        typeId: movieType.id,
      },
      {
        title: "The Irishman",
        duration: 209,
        videoUrl: "https://example.com/irishman",
        channelId: netflix.id,
        categoryId: drama.id,
        typeId: movieType.id,
      },
      {
        title: "The Mandalorian",
        duration: 40,
        videoUrl: "https://example.com/mandalorian",
        channelId: disney.id,
        categoryId: action.id,
        typeId: series.id,
      },
    ],
  });

  // Fetch created movies
  const [inception, irishman, mandalorian] = await prisma.movie.findMany();

  // Connect movies to users' watch later and favorites
  await prisma.watchLater.createMany({
    data: [
      { userId: user1.id, movieId: inception.id },
      { userId: user1.id, movieId: irishman.id },
      { userId: user2.id, movieId: mandalorian.id },
    ],
  });

  await prisma.favorite.createMany({
    data: [
      { userId: user1.id, movieId: inception.id },
      { userId: user2.id, movieId: irishman.id },
      { userId: user2.id, movieId: mandalorian.id },
    ],
  });

  console.log("Database has been seeded");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

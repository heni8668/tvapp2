const prisma = require("../prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  userSchema,
  loginSchema,
  favoriteSchema,
  watchLaterSchema,
} = require("../utils/validation");

const registerUser = async (req, res) => {
  try {
    userSchema.parse(req.body);
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.errors || error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    loginSchema.parse(req.body);
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    const username = user.username
    // const userId = user.id
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({userId:user.id, username, token });
  } catch (error) {
    res.status(400).json({ error: error.errors || error.message });
  }
};

const check = async (req, res) => {
  const username = req.user.username;
  const userid = req.user.userid;

  res.status(200).json({ msg: "the user is authenticated", username, userid });
};

const addToWatchLater = async (req, res) => {
  try {
    watchLaterSchema.parse(req.body);
    const { userId, movieId } = req.body;
    await prisma.watchLater.create({
      data: { userId, movieId },
    });
    res.status(201).json({ message: "Movie added to watch later list" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addToFavorites = async (req, res) => {
  try {
    favoriteSchema.parse(req.body);
    const { userId, movieId } = req.body;
    await prisma.favorite.create({
      data: { userId, movieId },
    });
    res.status(201).json({ message: "Movie added to favorites list" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const removeFromWatchLater = async (req, res) => {
  try {
    const { userId, movieId } = req.body;
    await prisma.watchLater.delete({
      where: {
        userId_movieId: { userId, movieId },
      },
    });
    res.json({ message: "Movie removed from watch later list" });
  } catch (error) {
    res
      .status(500)
      .json({
        error:
          "An error occurred while removing the movie from watch later list",
      });
  }
};

const removeFromFavorites = async (req, res) => {
  try {
    const { userId, movieId } = req.body;
    await prisma.favorite.delete({
      where: {
        userId_movieId: { userId, movieId },
      },
    });
    res.json({ message: "Movie removed from favorites list" });
  } catch (error) {
    res
      .status(500)
      .json({
        error: "An error occurred while removing the movie from favorites list",
      });
  }
};

const searchAndFilter = async (req, res) => {
  try {
    const {
      query,
      page = 1,
      perPage = 10,
      sortBy = "title",
      sortOrder = "asc",
    } = req.query;

    const filters = {};
    if (query) {
      filters.title = { contains: query, mode: "insensitive" };
    }

    const movies = await prisma.movie.findMany({
      where: filters,
      orderBy: { [sortBy]: sortOrder },
      skip: (page - 1) * perPage,
      take: perPage,
    });

    const totalMovies = await prisma.movie.count({ where: filters });

    res.json({ data: movies, total: totalMovies, page, perPage });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  check,
  addToWatchLater,
  addToFavorites,
  searchAndFilter,
  removeFromWatchLater,
  removeFromFavorites,
};

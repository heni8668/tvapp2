const prisma = require("../prisma/client");
const { movieSchema } = require("../utils/validation");

const getMovies = async (req, res) => {
  try {
    const movies = await prisma.movie.findMany({
      include: {
        Channel: true,
        Type: true,
        Category: true,
      },
    });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await prisma.movie.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        Channel: true,
        Type: true,
        Category: true,
      },
    });

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMoviesByTypeId = async (req, res) => {
  try {
    const { typeId } = req.params;
    const movies = await prisma.movie.findMany({
      where: {
        typeId: parseInt(typeId),
      },
      include: {
        Channel: true,
        Type: true,
        Category: true,
      },
    });

    if (movies.length === 0) {
      return res
        .status(404)
        .json({ error: "No movies found for the given Type ID" });
    }

    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createMovie = async (req, res) => {
  try {
    movieSchema.parse(req.body);
    const { title, duration, videoUrl, channelId, typeId, categoryId, status } =
      req.body;

    const movie = await prisma.movie.create({
      data: { title, duration, videoUrl, channelId, typeId, categoryId, status},
    });
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ error: error.errors || error.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, duration, videoUrl, channelId, typeId, categoryId, status  } =
      req.body;
    const updatedMovie = await prisma.movie.update({
      where: { id: Number(id) },
      data: {
        title,
        duration,
        videoUrl,
        channelId,
        typeId,
        categoryId,
        status
      },
    });
    res.json(updatedMovie);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the movie" });
  }
};

// const deleteMovie = async (req, res) => {
//   try {
//     await prisma.movie.delete({
//       where: { id: Number(req.params.id) },
//     });
//     res.status(204).json({ message: "Movie deleted" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.movie.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Movie deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the movie" });
  }
};

module.exports = { getMovies,getMovieById,getMoviesByTypeId, createMovie, updateMovie, deleteMovie };

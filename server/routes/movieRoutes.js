const express = require("express");
const {
  getMovies,
  getMovieById,
  getMoviesByTypeId,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movieController");

const router = express.Router();

router.get("/get-movie", getMovies);
router.get("/get-movie/:id", getMovieById);
router.get("/get-movie/:typeId", getMoviesByTypeId);
router.post("/add-movie", createMovie);
router.put("/update-movie/:id", updateMovie);
router.delete("/delete-movie/:id", deleteMovie);

module.exports = router;

import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Modal,
  Box,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
} from "../../services/movieService";
import { getCategories } from "../../services/categoryService";
import { getChannels } from "../../services/channelService";
import { getTypes } from "../../services/typeService";

const MovieManager = () => {
  const [movies, setMovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [channels, setChannels] = useState([]);
  const [types, setTypes] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [movieData, setMovieData] = useState({
    title: "",
    duration: "",
    videoUrl: "",
    channelId: "",
    categoryId: "",
    typeId: "",
  });

  useEffect(() => {
    fetchMovies();
    fetchCategories();
    fetchChannels();
    fetchTypes();
  }, []);
  console.log(channels);
  const fetchMovies = async () => {
    const data = await getMovies();
    const convertedData = data.map((movie) => ({
      ...movie,
      duration: (movie.duration / 3600000).toFixed(2), // Convert milliseconds to hours
    }));
    setMovies(convertedData);
    console.log(convertedData);
  };

  const fetchCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  const fetchChannels = async () => {
    const data = await getChannels();
    setChannels(data);
  };

  const fetchTypes = async () => {
    const data = await getTypes();
    setTypes(data);
  };

  const handleOpen = (movie = null) => {
    setEditingMovie(movie);
    setMovieData(
      movie
        ? { ...movie, duration: (movie.duration / 3600000).toFixed(2) }
        : {
            title: "",
            duration: "",
            videoUrl: "",
            channelId: "",
            categoryId: "",
            typeId: "",
          }
    );
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingMovie(null);
    setMovieData({
      title: "",
      duration: "",
      videoUrl: "",
      channelId: "",
      categoryId: "",
      typeId: "",
    });
  };

  const handleSave = async () => {
    const movie = {
      ...movieData,
      duration: parseFloat(movieData.duration) * 3600000, // Convert hours to milliseconds
    };
    try {
      if (editingMovie) {
        await updateMovie(editingMovie.id, movie);
      } else {
        await createMovie(movie);
      }
      fetchMovies();
      handleClose();
    } catch (error) {
      console.error("Error saving movie:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMovie(id);
      fetchMovies();
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Add Movie
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Duration (hours)</TableCell>
              <TableCell>Video URL</TableCell>
              <TableCell>Channel</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.map((movie) => (
              <TableRow key={movie.id}>
                <TableCell>{movie.id}</TableCell>
                <TableCell>{movie.title}</TableCell>
                <TableCell>{movie.duration}</TableCell>
                <TableCell>{movie.videoUrl}</TableCell>
                <TableCell>{movie.Channel?.name}</TableCell>
                <TableCell>{movie.Category?.name}</TableCell>
                <TableCell>{movie.Type?.name}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpen(movie)}>
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(movie.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={open} onClose={handleClose}>
        <Box
          component="form"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2>{editingMovie ? "Edit Movie" : "Add Movie"}</h2>
          <Box display="flex" justifyContent="space-between">
            <Box width="48%" sx={{ pr: 2 }}>
              <TextField
                sx={{ mb: 2 }}
                fullWidth
                label="Video URL"
                value={movieData.videoUrl}
                onChange={(e) =>
                  setMovieData({ ...movieData, videoUrl: e.target.value })
                }
              />
              <TextField
                sx={{ mb: 2 }}
                fullWidth
                label="Duration (hours)"
                value={movieData.duration}
                onChange={(e) =>
                  setMovieData({ ...movieData, duration: e.target.value })
                }
                type="number"
                inputProps={{ step: "0.1" }}
              />
              <FormControl fullWidth>
                <InputLabel>Channel</InputLabel>
                <Select
                  sx={{ mb: 2 }}
                  value={movieData.channelId}
                  onChange={(e) =>
                    setMovieData({ ...movieData, channelId: e.target.value })
                  }
                >
                  {channels.map((channel) => (
                    <MenuItem key={channel.id} value={channel.id}>
                      {channel.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box width="48%" sx={{ pl: 2 }}>
              <TextField
                sx={{ mb: 2 }}
                fullWidth
                label="Title"
                value={movieData.title}
                onChange={(e) =>
                  setMovieData({ ...movieData, title: e.target.value })
                }
              />
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  sx={{ mb: 2 }}
                  value={movieData.categoryId}
                  onChange={(e) =>
                    setMovieData({ ...movieData, categoryId: e.target.value })
                  }
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  sx={{ mb: 2 }}
                  value={movieData.typeId}
                  onChange={(e) =>
                    setMovieData({ ...movieData, typeId: e.target.value })
                  }
                >
                  {types.map((type) => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default MovieManager;

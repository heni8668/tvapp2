import axios from "axios";



export const getMovies = async () => {
  const response = await axios.get(`http://localhost:5000/api/movies/get-movie`);
  return response.data;
};


export const getMoviesById = async (id) => {
  const response = await axios.get(`http://localhost:5000/api/movies/get-movie/${id}`);
  return response.data;
};
export const getMoviesByTypeId = async (typeId) => {
  const response = await axios.get(
    `http://localhost:5000/api/movies/get-movie/${typeId}`
  );
  return response.data;
};

export const createMovie = async (movie) => {
  const response = await axios.post(`http://localhost:5000/api/movies/add-movie`, movie);
  return response.data;
};

export const updateMovie = async (id, movie) => {
  const response = await axios.put(
    `http://localhost:5000/api/movies/update-movie/${id}`,
    movie
  );
  return response.data;
};

export const deleteMovie = async (id) => {
  const response = await axios.delete(
    `http://localhost:5000/api/movies/delete-movie/${id}`
  );
  return response.data;
};

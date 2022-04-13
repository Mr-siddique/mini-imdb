import axios from "axios";

const URL = "https://tmdb-node-api.herokuapp.com";

const fetchMovies = () => axios.get(`${URL}/movies`);

const fetchDirectors = () => axios.get(`${URL}/directors`);

const fetchAllMoviesOfADirector = (directorId) =>
  axios.get(`${URL}/movies/${directorId}`);

const postMovie = (data) => axios.post(`${URL}/movie`, data);

const deleteAMovie = (movieId) => axios.delete(`${URL}/movie/${movieId}`);

const putMovie = (movieId, data) => axios.put(`${URL}/movie/${movieId}`, data);

const postDirector = (data) => axios.post(`${URL}/director`, data);

const deleteDirector = (directorId) =>
  axios.delete(`${URL}/director/${directorId}`);

const putDirector = (directorId, data) =>
  axios.put(`${URL}/director/${directorId}`, data);

export {
  fetchMovies,
  fetchDirectors,
  fetchAllMoviesOfADirector,
  postMovie,
  deleteAMovie,
  putMovie,
  postDirector,
  deleteDirector,
  putDirector,
};

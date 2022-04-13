import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { fetchMovies } from "../apiCalls";
import { movieAction } from "../store/movie";
import MovieCard from "./MovieCard";
import Form from "./Form";

const Movies = () => {
  const dispatch = useDispatch();
  const movieId = useSelector((state) => state.movie.movieId);
  const movies = useSelector((state) => state.movie.movies);
  const getMovies = async () => {
    try {
      const { data } = await fetchMovies();
      dispatch(movieAction.setMovies(data.data));
    } catch (err) {
      console.log(err);
    }
  };
  const addCatogery = () => {
    return movies.reduce((acc, curr) => {
      const category = curr.categories;
      for (let i = 0; i < category.length; i++) {
        if (acc.find((cat) => category[i] === cat || category[i].length<3)) continue;
        acc.push(category[i]);
      }
      return acc;
    }, []);
  };

  dispatch(movieAction.addCatogery(addCatogery()));
  useEffect(() => {
    getMovies();
  }, [movieId]);
  return (
    <>
      {!movieId ? (
        <>
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </>
      ) : (
        <Form />
      )}
    </>
  );
};

export default Movies;

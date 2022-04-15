import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { fetchMovies } from "../apiCalls";
import { movieAction } from "../store/movie";
import MovieCard from "./MovieCard";
import Form from "./Form";
import moment from "moment";

const Movies = () => {
  const dispatch = useDispatch();
  const movieId = useSelector((state) => state.movie.movieId);
  let movies = useSelector((state) => state.movie.movies);

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
  const addCeleb=()=>{
    return movies?.reduce((acc,curr)=>{
      const celeb=curr.leadroles;
      for(let i=0;i<celeb.length;i++){
        if (acc.find((Cel) => celeb[i] === Cel || celeb[i].length<3)) continue;
        acc.push(celeb[i]);
      }
      return acc;
    },[]);
  }
  dispatch(movieAction.addCatogery(addCatogery()));
  dispatch(movieAction.addCelebrity(addCeleb()));
  useEffect(() => {
    getMovies();
   movies=movies.slice().sort((first,second)=>moment(first.id).valueOf()-moment(second.id).valueOf());
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

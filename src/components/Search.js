import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import Form from './Form';

const Search = () => {
  const searchMovie = useSelector((state) => state.movie.searchMovie);
  const movieId=useSelector(state=>state.movie.movieId);
  return (
    <>
      {searchMovie.map((movie) => (
        <MovieCard movie={movie} />
      ))}
      {
        movieId && <Form/>
      }
    </>
  );
};


export default Search;
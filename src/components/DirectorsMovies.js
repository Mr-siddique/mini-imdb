import { useEffect } from "react";
import DirectorCard from "./DirectorCard.js";
import { fetchDirectors, postMovie } from "../apiCalls";
import { directorAction } from "../store/director";
import { directorsMoviesAction } from "../store/directorsMovies";
import { useDispatch, useSelector } from "react-redux";
import { movieAction } from "../store/movie.js";
import { useNavigate } from "react-router-dom";
import DirectorForm from "./DirectorForm.js";
import { postDirector } from "../apiCalls";
import Form from "./Form";

const DirectorsMovies = () => {
  const navigate = useNavigate();
  const directors = useSelector((state) => state.director.directors);
  const addMovie = useSelector((state) => state.directorsAndMovies.addMovie);
  const newMovie = useSelector((state) => state.directorsAndMovies.newMovie);
  const movieId = useSelector((state) => state.movie.movieId);

  const dispatch = useDispatch();
  const getDirectors = async () => {
    try {
      const { data } = await fetchDirectors();
      dispatch(directorAction.setDirectors(data));
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = (e) => {
    dispatch(
      directorsMoviesAction.changeNewMovie({
        ...newMovie,
        [e.target.name]: e.target.value,
      })
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await postMovie({ ...newMovie, director_id: addMovie });
      dispatch(movieAction.addMovie(data.data));
      dispatch(
        directorsMoviesAction.addNewMovieOfDirector({
          directorId: addMovie,
          movie: data.data,
        })
      );
      dispatch(directorsMoviesAction.addMovie(null));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDirectors();
  }, [newMovie]);
  return (
    <>
      {!addMovie ? (
        <>
        {
          movieId && <Form/>
        }
          {directors.map((director) => (
            <DirectorCard director={director} key={director.id} />
          ))}
          <DirectorForm />
        </>
      ) : (
        <form onSubmit={handleSubmit} style={formStyles}>
          <input
            type="text"
            style={inputStyle}
            placeholder="Enter Movie Name..."
            onChange={handleChange}
            name="moviename"
          />
          <input
            type="text"
            style={inputStyle}
            placeholder="Enter Movie Summary..."
            onChange={handleChange}
            name="moviedesc"
          />
          <input
            type="text"
            style={inputStyle}
            placeholder="Enter Poster URL..."
            onChange={handleChange}
            name="movieposter"
          />
          <input
            type="text"
            style={inputStyle}
            placeholder="Enter Catogeries Saperated By Comma','."
            onChange={handleChange}
            name="categories"
          />
          <input
            type="text"
            style={inputStyle}
            placeholder="Enter Lead Actors Saperated By Comma ','."
            onChange={handleChange}
            name="leadroles"
          />
          <button style={btnStyle}>Submit</button>
        </form>
      )}
    </>
  );
};

export default DirectorsMovies;

const formStyles = {
  width: "350px",
  display: "flex",
  flexDirection: "column",
  margin: "auto",
  marginTop: "20px",
};
const inputStyle = {
  width: "100%",
  margin: "5px",
  padding: "5px",
  height: "30px",
  fontFamily: "inherit",
  fontSize: "15px",
  color: "gray",
  borderRadius: "5px",
  border: "none",
};
const btnStyle = {
  backgroundColor: "#33adff",
  height: "40px",
  border: "none",
  cursor: "pointer",
  borderRadius: "5px",
  fontSize: "18px",
  color: "white",
  marginTop: "15px",
  width: "50%",
  margin: "15px auto",
};

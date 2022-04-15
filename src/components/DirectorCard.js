import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMoviesOfADirector } from "../apiCalls";
import { directorsMoviesAction } from "../store/directorsMovies";
import MovieCard from "./MovieCard";
import moment from "moment";

const DirectorCard = ({ director }) => {
  const dispatch = useDispatch();
  const movies = useSelector(
    (state) => state.directorsAndMovies.directorsAndMovies
  );
  const addMovie = useSelector((state) => state.directorsAndMovies.addMovie);
  const getAllMoviesOfADirector = async () => {
    try {
      const { data } = await fetchAllMoviesOfADirector(director.id);
      dispatch(
        directorsMoviesAction.addDirectorsAndMovies({
          directorId: director.id,
          movies: data.data,
        })
      );
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getAllMoviesOfADirector(director.id);
  }, [addMovie]);
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          margin: "20px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginRight: "20px",
            width: "300px",
            maxWidth: "50%",
          }}
        >
          <img src={director.imageurl} class="card" style={imageStyle} />
          <button
            class="addMovie"
            style={btnStyle}
            onClick={() =>
              dispatch(directorsMoviesAction.addMovie(director.id))
            }
          >
            + Add Movie
          </button>
        </div>
        <div className="description" style={descStyle}>
          <h2>{director.name}</h2>
          <p style={{ fontSize: "12px", marginBottom: "5px" }}>
            {director.description}
          </p>
        </div>
      </div>
      {movies &&
        movies[director.id] &&
        movies[director.id].map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
    </>
  );
};

export default DirectorCard;

const imageStyle = {
  width: "100%",
  height: "300px",
  borderRadius: "50%",
};
const descStyle = {
  width: "30%",
  maxWidth: "50%",
};

const btnStyle = {
  marginTop: "1rem",
  height: "40px",
  fontFamily: "inherit",
  fontSize: "18px",
  cursor: "pointer",
  border: "none",
  color: "white",
  backgroundColor: "#1ad1ff",
  borderRadius: "5px",
};

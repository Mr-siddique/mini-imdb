import { useDispatch, useSelector } from "react-redux";
import { deleteAMovie } from "../apiCalls";
import { directorsMoviesAction } from "../store/directorsMovies";
import { movieAction } from "../store/movie";
import moment from "moment";


const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const categories = movie.categories.join(",");
  const leadroles = movie.leadroles.join(",");

  const editMovie = (e) => {
    e.preventDefault();
    window.scrollTo(0,0);
    dispatch(movieAction.toggleMovieId(movie.id));
    dispatch(
      movieAction.updateMovie({
        moviename: movie.moviename,
        moviedesc: movie.moviedesc,
        movieposter: movie.movieposter,
        leadroles: movie.leadroles,
        categories: movie.categories,
      })
    );
  };
  const deleteMovie = async (e) => {
    e.preventDefault();
    try {
      const { data } = await deleteAMovie(movie.id);
      dispatch(movieAction.removeMovie(data.data.id));
      dispatch(
        directorsMoviesAction.removeMovie({
          directorId: data.data.director_id,
          movieId: data.data.id,
        })
      );
      dispatch(movieAction.removeSearchMovie(data.data.id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={cardStyle} id={movie.director_id}>
      <img src={movie.movieposter} style={imageStyle} className="card" />
      <h3 style={{ marginBottom: "10px" }}>{movie.moviename}</h3>
      <p style={{ fontSize: "12px", marginBottom: "5px" }}>{movie.moviedesc}</p>

      <p>catogery: {categories}</p>
      <p>Leadroles: {leadroles}</p>
      <small>{moment(movie.createdat).fromNow()}</small>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "10px 0px",
        }}
      >
        <button style={btnStyle} onClick={editMovie}>
          Edit
        </button>
        <button style={btnStyle2} onClick={deleteMovie}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default MovieCard;

const cardStyle = {
  minWidth:'350px',
  width: "20%",
  padding: "5px",
  margin: "20px",
};

const imageStyle = {
  width: "100%",
  height: "300px",
  marginBottom: "15px",
};

const btnStyle = {
  width: "50px",
  height: "30px",
  border: "none",
  background: "inherit",
  fontFamily: "inherit",
  fontSize: "15px",
  color: "white",
  cursor: "pointer",
};
const btnStyle2 = {
  width: "50px",
  height: "30px",
  border: "none",
  background: "inherit",
  fontFamily: "inherit",
  fontSize: "15px",
  color: "red",
  cursor: "pointer",
};

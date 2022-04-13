import {putMovie } from "../apiCalls";
import {directorsMoviesAction} from "../store/directorsMovies"
import { useDispatch, useSelector } from "react-redux";
import { movieAction } from "../store/movie.js";
import { useNavigate } from "react-router-dom";

const From = () => {
    const movieId = useSelector((state) => state.movie.movieId);
    const updateMovie=useSelector(state=>state.movie.updateMovie);
    const searchMovie=useSelector(state=>state.movie.searchMovie);
    const dispatch = useDispatch();
    const navigate=useNavigate();

    const handleChange=(e)=>{
        dispatch(movieAction.updateMovie({...updateMovie,[e.target.name]:e.target.value}));
    }
      const handleSubmit = async(e) => {
        e.preventDefault();
        try{
         const {data}= await putMovie(movieId,updateMovie);
         dispatch(movieAction.updateMovieData(data.data));
         dispatch(movieAction.updateSearchMovie(data.data));
         dispatch(movieAction.toggleMovieId(null));
         navigate('/');
        }catch(err){
          console.log(err)
        }
      }; 
    
  return (
    <form onSubmit={handleSubmit} style={formStyles}>
      <input
        type="text"
        style={inputStyle}
        placeholder="Enter Movie Name..."
        onChange={handleChange}
        name="moviename"
        value={updateMovie?.moviename}
      />
      <input
        type="text"
        style={inputStyle}
        placeholder="Enter Movie Summary..."
        onChange={handleChange}
        name="moviedesc"
        value={updateMovie?.moviedesc}
      />
      <input
        type="text"
        style={inputStyle}
        placeholder="Enter Poster URL..."
        onChange={handleChange}
        name="movieposter"
        value={updateMovie?.movieposter}
      />
      <input
        type="text"
        style={inputStyle}
        placeholder="Enter Catogeries Saperated By Comma','."
        onChange={handleChange}
        name="categories"
        value={updateMovie?.categories}

      />
      <input
        type="text"
        style={inputStyle}
        placeholder="Enter Lead Actors Saperated By Comma ','."
        onChange={handleChange}
        name="leadroles"
        value={updateMovie?.leadroles}

      />
      <button style={btnStyle}>Submit</button>
    </form>
  );
};

export default From;
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
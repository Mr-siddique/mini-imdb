import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { movieAction } from "../store/movie";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const category = useSelector((state) => state.movie.category);
  const movies = useSelector((state) => state.movie.movies);
  const handleChange = (e) => {
    const value = e.target.value;
    if (value === "All") {
      dispatch(movieAction.setSearchMovie(movies));
    } else {
      const searchMovie = movies.filter((movie) =>
        movie.categories.includes(value)
      );
      dispatch(movieAction.setSearchMovie(searchMovie));
    }
    navigate("/search");
  };
  const handleSubmit = (e) => {
    if (e.keyCode !== 13) return;
    const value = e.target.value.toLowerCase();
    const searchMovie = movies.filter(
      (movie) =>
        movie.moviename.toLowerCase() === value ||
        movie.moviedesc.toLowerCase().includes(value) ||
        movie.categories
          .join(",")
          .replace(/,/g, "")
          .toLowerCase()
          .includes(value) ||
        movie.leadroles
          .join(",")
          .replace(/,/g, "")
          .toLowerCase()
          .includes(value)
    );
    dispatch(movieAction.setSearchMovie(searchMovie));
    navigate("/search");
  };
  return (
    <header style={headerStyle} className="header">
      <ul style={navStyle} className={'nav'}>
        <li>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            Movies
          </Link>
        </li>
        <li>
          <Link
            to="/directors"
            style={{ textDecoration: "none", color: "black" }}
          >
            Directors
          </Link>
        </li>
        <li>
          <Link
            to="/directors/movies"
            style={{ textDecoration: "none", color: "black" }}
          >
            Movies & Directors
          </Link>
        </li>
      </ul>
      <input
        type="search"
        placeholder="search movies..."
        style={searchStyle}
        onKeyUp={handleSubmit}
        // style={{width:window.screen.width<=500&&'100%'}}
        
      />
      <select style={selectStyle} onChange={handleChange}>
        <option>All</option>
        {category.map((cat) => (
          <option>{cat}</option>
        ))}
      </select>
    </header>
  );
};

export default Header;

const searchStyle = {
  width:'30%',
  height: "40px",
  border: "none",
  fontFamily: "inherit",
  borderRadius: "5px",
  padding: "5px",
  fontSize: "15px",
  margin:'10px'
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-around",
  flexWrap:'wrap',
  backgroundColor: "#F5C747",
  color: "black",
  minHeight:'100px',
  alignItems: "center",
};

const navStyle = {
  listStyle: "none",
  display: "flex",
  cursor: "pointer",
  width: "30%",
  justifyContent: "space-between",
  fontWeight: "900",
};

const selectStyle = {
  minWidth: "100px",
  width: "10%",
  height: "40px",
  border: "none",
  borderRadius: "5px",
  backgroundColor: "#fff",
  color: "gray",
  fontFamily: "inherit",
  fontSize: "15px",
  textAlign: "center",
};

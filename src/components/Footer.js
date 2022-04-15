import { Button, ButtonGroup } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { movieAction } from "../store/movie";

const Footer = () => {
  const celebrity = useSelector((state) => state.movie.celeb);
  const movies = useSelector((state) => state.movie.movies);
  const dispatch = useDispatch();
  const navigate = useNavigate("/");

  const handleClick = (e) => {
    const value = e.target.innerText;
    dispatch(
      movieAction.setSearchMovie(
        movies.filter((movie) =>
          movie.leadroles
            .join(",")
            .trim()
            .replace(/,/g, "")
            .toLowerCase()
            .includes(value.toLowerCase())
        )
      )
    );
    navigate("/search");
  };
  return (
    <ButtonGroup
      size="small"
      variant="text"
      style={{
        backgroundColor: "#fff",
        padding: "20px",
        border: "none",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {celebrity.map((celeb) => (
        <Button onClick={handleClick}>{celeb}</Button>
      ))}
    </ButtonGroup>
  );
};

export default Footer;

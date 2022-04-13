import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDirectors } from "../apiCalls";
import { directorAction } from "../store/director";
import Directorcard from "./Directorcard";
import DirectorForm from "./DirectorForm";

const Directors = () => {
  const dispatch = useDispatch();
  const directors = useSelector((state) => state.director.directors);
  const edit = useSelector((state) => state.director.edit);
  const getDirectors = async () => {
    try {
      const { data } = await fetchDirectors();
      dispatch(directorAction.setDirectors(data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDirectors();
  }, []);

  return (
    <>
    {
      edit && (
        <DirectorForm/>
      )
    }
      {directors.map((director) => (
        <Directorcard key={director.id} director={director} />
      ))}
    </>
  );
};

export default Directors;

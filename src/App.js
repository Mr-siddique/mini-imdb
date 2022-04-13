import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Movies from "./components/Movies";
import Directors from "./components/Directors";
import DirectorsMovies from "./components/DirectorsMovies";
import Search from "./components/Search";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main style={mainStyle}>
        <Routes>
          <Route exact path="/" element={<Movies />} />
          <Route
            exact
            path="/directors"
            element={<Directors currentRoute="/directors" />}
          />
          <Route
            exact
            path="/directors/movies"
            element={<DirectorsMovies currentRoute="/directors" />}
          />
          <Route
          exact  
          path="/search"
          element={<Search/>}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;

const mainStyle = {
  width:'100vw',
  display: "flex",
  flexWrap: "wrap",
};

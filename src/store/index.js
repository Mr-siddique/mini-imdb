import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./movie";
import directorSlice from "./director";
import directorsMoviesSlice from "./directorsMovies";

const store = configureStore({
  reducer: {
    movie: movieSlice.reducer,
    director: directorSlice.reducer,
    directorsAndMovies: directorsMoviesSlice.reducer,
  },
});

export default store;

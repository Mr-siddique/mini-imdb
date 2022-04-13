import {createSlice} from "@reduxjs/toolkit";

const movieSlice=createSlice({
      name:'movie',
      initialState:{
          movies:[],
          updateMovie:{
          },
          movieId:null,
          category:[],
          searchMovie:[]
      },
      reducers:{
        setMovies(state,action){
            state.movies=action.payload;
        },
        addMovie(state,action){
          state.movies=[...state.movies,action.payload];
        },
        removeMovie(state,action){
          state.movies=state.movies.filter(movie=>movie.id!==action.payload);
        },
        updateMovie(state,action){
         state.updateMovie=action.payload;
        },
        updateMovieData(state,action){
          state.movies=state.movies.filter(movie=>movie.id!==action.payload.id);
          state.movies=[...state.movies,action.payload];
        },
        toggleMovieId(state,action){
          state.movieId=action.payload
        },
        addCatogery(state,action){
          state.category=action.payload;
        },
        setSearchMovie(state,action){
          state.searchMovie=action.payload
        },
        removeSearchMovie(state,action){
          state.searchMovie=state.searchMovie.filter(movie=>movie.id!==action.payload)
        },
        updateSearchMovie(state,action){
          const movie=action.payload;
          state.searchMovie=state.searchMovie.filter(Movie=>Movie.id!==movie.id);
          state.searchMovie=[...state.searchMovie,movie];
        }
      }

});

export const movieAction=movieSlice.actions;
export default movieSlice;
import { createSlice } from "@reduxjs/toolkit";

const directorsMoviesSlice=createSlice({
    name:'directorAndMovies',
    initialState:{
        directorsAndMovies:{

        },
        addMovie:null,
        newMovie:{
            moviename:'',
            moviedesc:'',
            movieposter:'',
            categories:'',
            leadroles:''
        }
    },
    reducers:{
        addDirectorsAndMovies(state,action){
            state.directorsAndMovies={...state.directorsAndMovies,[action.payload.directorId]:action.payload.movies};
        },
        addMovie(state,action){
          state.addMovie=action.payload;
        },
        addDirector(state,action){

        },
        changeNewMovie(state,action){
            state.newMovie=action.payload;
        },
        addNewMovieOfDirector(state,action){
            state.directorsAndMovies={...state.directorsAndMovies,[action.payload.directorId]:[...state.directorsAndMovies[action.payload.directorId],action.payload.movie]};
        },
        removeMovie(state,action){
            state.directorsAndMovies={...state.directorsAndMovies,[action.payload.directorId]:state.directorsAndMovies[action.payload.directorId]?.filter(movie=>movie.id!==action.payload.movieId)}
        },
        updateMovieData(state,action){
            const id=action.payload.director_id;
            const movieId=action.payload.id;
            state.directorsAndMovies={...state.directorsAndMovies,[id]:state.directorsAndMovies[id]?.filter(movie=>movie.id!==movieId)};
            state.directorsAndMovies={...state.directorsAndMovies,[id]:action.payload};
            console.log(state.directorsAndMovies);
        }
    }

})

export const directorsMoviesAction=directorsMoviesSlice.actions;
export default directorsMoviesSlice;





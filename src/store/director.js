import { createSlice } from "@reduxjs/toolkit";

const directorSlice = createSlice({
  name: "director",
  edit:false,
  initialState: {
    directors: [],
    newDirector:{
      fullname:'',
      description:'',
      imageurl:''
    },
    editDirector:{
      
    }
  },
  reducers: {
    setDirectors(state, action) {
      state.directors = action.payload;
    },
    changeValue(state,action){
      state.newDirector={...state.newDirector,[action.payload.name]:action.payload.value};
    },
    addDirector(state,action){
      state.directors=[...state.directors,action.payload];
    },
    removeDirector(state,action){
      state.directors=state.directors.filter(director=>director.id!==action.payload);
    },
    toggleEdit(state,action){
      state.edit=action.payload;
    },
    setNewDirector(state,action){
      state.newDirector=action.payload;
    },
    clearState(state){
      state.newDirector={
        fullname:'',
        description:'',
        imageurl:''
      }
    },
    filterNewDirector(state,action){
      state.directors=state.directors.filter(director=>director.id!==action.payload.id);
      state.directors=[...state.directors,action.payload];
    }
  },
});

export const directorAction = directorSlice.actions;
export default directorSlice;

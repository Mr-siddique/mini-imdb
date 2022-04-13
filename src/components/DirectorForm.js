import { useDispatch, useSelector } from "react-redux";
import { postDirector, putDirector } from "../apiCalls";
import { directorAction } from "../store/director";
import { directorsMoviesAction } from "../store/directorsMovies";

const DirectorForm = () => {
  const dispatch = useDispatch();
  const directorData=useSelector((state)=>state.director.newDirector);
  const edit=useSelector(state=>state.director.edit);
  const handleChange = (e) => {
    dispatch(
      directorAction.changeValue({ name: e.target.name, value: e.target.value })
    );
  };
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      if(edit){
        const {data}=await putDirector(edit,directorData);
        dispatch(directorAction.filterNewDirector(data.data));
        dispatch(directorAction.toggleEdit(null))
      }else{
        const {data}= await postDirector(directorData);
        dispatch(directorAction.addDirector(data));
      }
    }catch(err){
        console.log(err)
    }
  }
  return (
    <form style={formStyles} onSubmit={handleSubmit}>
      <input
        style={inputStyle}
        onChange={handleChange}
        type="text"
        name="fullname"
        placeholder="Enter the name of director..."
        value={directorData.fullname}
      />
      <input
        style={inputStyle}
        onChange={handleChange}
        type="text"
        name="description"
        placeholder="Enter the bio of director..."
        value={directorData.description}
      />
      <input
        type="text"
        style={inputStyle}
        onChange={handleChange}
        name="imageurl"
        placeholder="Enter the imageurl of director..."
        value={directorData.imageurl}
      />
      <button style={btnStyle} type="Submit">
        Add Director
      </button>
    </form>
  );
};

export default DirectorForm;

const formStyles = {
  width: "350px",
  display: "flex",
  flexDirection: "column",
  margin: "auto",
  marginTop: "20px",
  width: "90%",
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

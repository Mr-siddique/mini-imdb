import { useDispatch, useSelector } from "react-redux";
import { deleteDirector } from "../apiCalls";
import { directorAction } from "../store/director";

const Directorcard = ({ director }) => {
  const dispatch=useDispatch();
  // const newDirector= useSelector(state=>state.director.new)
  const handleEdit=()=>{
    window.scrollTo(0,0);
    dispatch(directorAction.toggleEdit(director.id));
    dispatch(directorAction.setNewDirector({fullname:director.fullname,description:director.description,imageurl:director.imageurl}));
  }

  const handleDelete=async ()=>{
    try{
      const {data}=await deleteDirector(director.id);
      dispatch(directorAction.removeDirector(data.data.id));
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div
      style={{
        display: "flex",
        margin: "20px",
        flexDirection: "column",
        width: "350px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginRight: "20px",
        }}
      >
        <img src={director.imageurl} class="card" style={imageStyle} />
      </div>
      <div className="description">
        <h2>{director.fullname}</h2>
        <p style={{ fontSize: "12px", marginBottom: "5px" }}>
          {director.description}
        </p>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <button
          style={{
            background: "inherit",
            fontFamily: "inherit",
            fontSize: "15px",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
          onClick={handleEdit}
        >
          Edit
        </button>
        <button
          style={{
            background: "inherit",
            fontFamily: "inherit",
            fontSize: "15px",
            color: "red",
            border: "none",
            cursor: "pointer",
          }}
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Directorcard;

const imageStyle = {
  width: "100%",
  height: "300px",
  borderRadius: "50%",
};

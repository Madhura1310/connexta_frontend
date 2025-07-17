import "./share.css"
import{PermMedia,Label,Room,EmojiEmotions,Cancel} from "@mui/icons-material"
import { useContext,useRef,useState } from "react";
import {AuthContext} from  "../../context/AuthContext";
import axios from "axios";

export default function Share() {

  const {user} = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file,setFile] = useState(null);

  // const submitHandler = async (e)=>{
  //   e.preventDefault()
  //   const newPost = {
  //     userId: user._id,
  //     desc: desc.current.value
  //   }
  //   if(file){
  //     const data = new FormData();
  //     const fileName = Date.now() + file.name;
  //     console.log("-----------",fileName)
  //     data.append("file",file)
  //     data.append("name",fileName);
  //     newPost.img = fileName;
  //     try{
  //         await axios.post("/upload",data);
  //     }catch(err){
  //       console.log(err)
  //     }
  //   console.log("-----------",fileName)
  //   }
  //     try{
  //       await axios.post("/posts",newPost);
  //       // window.location.reload()
  //     }catch(err){

  //     }
      
  // }

  const submitHandler = async (e) => {
  e.preventDefault();
  const newPost = {
    userId: user._id,
    desc: desc.current.value
  };

  if (file) {
    const data = new FormData();
    data.append("file", file); // Just send the file, let backend handle naming
    try {
      // First upload the file and get the generated filename
      const uploadRes = await axios.post("/upload", data);
      newPost.img = uploadRes.data.filename; // Use the filename from backend
    } catch (err) {
      console.log(err);
    }
  }

  try {
    await axios.post("/posts", newPost);
    window.location.reload()
  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="share">
      <div className="sharewrapper"></div>
      <div className="shareTop">
        <img className="shareProfileImg" src={user.profilePicture ? PF+user.profilePicture : PF+"noavatra.jpg"} alt=""/>
        <input placeholder={"what's in your mind " + user.username + "?"} 
        className="shareInput" ref={desc}/>
      </div>
       <hr className="shareHr"/>
       {file && (
        <div className="shareImgContainer">
          <img className="shareImg" src={URL.createObjectURL(file)} alt=""/>
          <Cancel className="shareCancelImg" onClick={()=>setFile(null)}/>
          </div>
       )}
      <form className="shareBottom" onSubmit={submitHandler}>
        <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
                <PermMedia htmlColor="tomato" className="shareIcon"/>
                <span className="shareOptionText">Photo or Video</span>
                <input style={{display: "none"}} type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e)=>setFile(e.target.files[0])}/>
            </label>

              <div className="shareOption">
                <Label htmlColor="blue" className="shareIcon"/>
                <span className="shareOptionText">Tag</span>
            </div>

              <div className="shareOption">
                <Room  htmlColor="green" className="shareIcon"/>
                <span className="shareOptionText">Location</span>
            </div>
               <div className="shareOption">
                <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                <span className="shareOptionText">Feelings</span>
            </div>
            <button className="shareButton" type="submit">Share</button>
        </div>
      </form>
    </div>
  )
}


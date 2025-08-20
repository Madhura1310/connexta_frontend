import { useState, useEffect } from "react"
import "./chatonline.css"
import axios from "axios";

export default function ChatOnline({onlineUsers, currentId, setCurrentChat }) {
   const [friends,setFriends] = useState([]);
   const [OnlineFriends, setOnlineFriends] = useState([]);
   const PF = process.env.REACT_APP_PUBLIC_FOLDER;

   useEffect(()=>{
     const getFriends = async ()=>{
      const res = await axios.get("/users/friends/"+ currentId);
      setFriends(res.data);
     }
     getFriends();
   },[currentId]);

  useEffect(()=>{
    setOnlineFriends(friends.filter(f=>onlineUsers.includes(f._id)));
  },[friends, onlineUsers]);

  return (
    <div className="chatOnline">
      {OnlineFriends.map((o)=>(
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
            <img className="chatOnlineImg" src={o.profilePicture ? PF + o.profilePicture : PF+"noavatra.jpg"} alt=""/>
            <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">{o.username}</span>
      </div>
      ))}
    </div>
  )
}

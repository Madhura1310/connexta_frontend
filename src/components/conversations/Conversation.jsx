import { useEffect, useState } from "react";
import "./conversation.css"; 
import axios from "axios";

export default function Conversation({conversation,currentUser, isOnline}) {
  const [user,setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  useEffect(()=>{
    const friendId = conversation.members.find((m)=> m !== currentUser._id);

    const getUser = async () =>{
      try{
      const res = await axios.get("/users?userId=" + friendId);
      setUser(res.data)
      }catch (err){
        console.log(err);
      }
    };
    getUser()
  },[currentUser, conversation]);

 
  return (
    // <div className="conversation">
    <div className={`conversation ${isOnline ? 'online' : ''}`}>
      <img className="conversationImg"
       src={user?.profilePicture ? PF+user.profilePicture : PF+"noavatra.jpg"}
       alt=""/>
      <span className="conversationName">{user?.username}</span>
      {isOnline && <span className="online-indicator"></span>}
    </div>
    
  )
}

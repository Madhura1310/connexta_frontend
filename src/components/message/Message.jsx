import "./message.css";
import {format} from "timeago.js"

export default function Message({message, own}) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img 
        className="messageImg"
        src="https://images.pexels.com/photos/8863582/pexels-photo-8863582.jpeg"
        alt=""/>
       <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  )
}




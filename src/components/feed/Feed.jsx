// import Share from "../share/Share"
// import Post from "../post/Post"
// import "./feed.css"
// import { useEffect, useState } from "react";


// export default function Feed() {
//   const [posts,setPosts] = useState([]);

//   useEffect(()=>{
//     console.log("feed rendered")
//   })
//   return (
//     <div className="feed">
//       <div className="feedWrapper">
//         <Share/>
//         {/* {Posts.map((post) => (
//         <Post key={post.id} post={post} />
//       ))} */}
//         <Post/>
         
//       </div>
//     </div>
//   )
// }

import Share from "../share/Share";
import Post from "../post/Post";
import "./feed.css";
import { useEffect, useState } from "react";
import {AuthContext} from "../../context/AuthContext";
import { useContext } from "react"
import axios from "axios"

export default function Feed({username}) {
  const [posts, setPosts] = useState([]);
  const {user} = useContext(AuthContext)
  useEffect( () => {
    const fetchPosts = async() =>{
    const res = username 
      ? await axios.get("/posts/profile/" + username)
     :await axios.get("posts/timeline/"+ user._id);
    setPosts(res.data)
    console.log("data",res.data.sort((p1,p2)=>{
      return new Date(p2.createdAt) - new Date(p1.createdAt);
    }))
    };
    fetchPosts();
  }, [username,user._id]);
  

  return (
    <div className="feed">
      <div className="feedWrapper">
      {(!username || username === user.username )&&<Share />}
        
        {/* If you want to render dynamic posts, use this: */}
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}

        {/* Currently just rendering one static post */}
        <Post />
      </div>
    </div>
  );
}


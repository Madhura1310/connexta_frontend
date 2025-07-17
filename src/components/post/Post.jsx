import "./post.css";
import { MoreVert } from "@mui/icons-material";
import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  // console.log("---",post);
  const [like, setLike] = useState(post?.like?.length ||0);
  const [isLiked, setIsLiked] = useState(false);
  const [users, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser} = useContext(AuthContext)


    useEffect(() => {
      if (currentUser?._id && post?.like) {
        setIsLiked(post.like.includes(currentUser._id));
      }
    }, [currentUser?._id, post?.like]); 
    
      useEffect( () => {
        if (!post?.userId) return;
        const fetchUser = async() =>{
        const res = await axios.get(`/users?userId=${post.userId}`)
        setUser(res.data)
        };
        fetchUser();
      }, [post]);

  if (!post) return 

  // const user = Users.find((u) => u.id === post.userId);

  const handleLike = () => {
    try{
     axios.put("posts/"+post._id +"/like",{userId: currentUser._id})
    }
    catch(err){}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };



  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${ users.username}`}>
            <img 
              className="postProfileImg" 
              src={users.profilePicture ? PF + users.profilePicture : PF+"noavatra.jpg" } 
              alt="profile" 
            /></Link>
            <span className="postUsername">{users.username}</span>
            <span className="postDate">{format(post.createdAt)}</span> {/* Changed from data to date */}
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          {post.desc && <span className="postText">{post.desc}</span>}
          {post.img && (
            <img 
              className="postImg" 
              src={PF + post.img} 
              alt="post content" 
              onError={(e) => {
                e.target.onerror = null;
                // e.target.src = "/assets/default-post.jpg";
              }}
            />
          )}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img 
              className="likeIcon" 
              src={`${PF}like.png `}
              alt="like" 
              onClick={handleLike}
            />
            <img 
              className="likeIcon" 
              src={`${PF}heart.jpg`} 
              alt="heart" 
              onClick={handleLike}
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}




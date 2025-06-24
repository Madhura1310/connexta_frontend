import "./post.css";
import { MoreVert } from "@mui/icons-material";
import { Users } from "../../dummydata";
import { useState } from "react";

export default function Post({ post }) {
  const [like, setLike] = useState(post?.like || 0);
  const [isLiked, setIsLiked] = useState(false);

  if (!post) return <div>Loading post...</div>;

  const user = Users.find((u) => u.id === post.userId);

  const handleLike = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img 
              className="postProfileImg" 
              src={user?.profilePicture || "/assets/default-profile.png"} 
              alt="profile" 
            />
            <span className="postUsername">{user?.username || "Unknown User"}</span>
            <span className="postDate">{post.date}</span> {/* Changed from data to date */}
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          {post.desc && <span className="postText">{post.desc}</span>}
          {post.photo && (
            <img 
              className="postImg" 
              src={post.photo} 
              alt="post content" 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/assets/default-post.jpg";
              }}
            />
          )}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img 
              className="likeIcon" 
              src="/assets/like.png" 
              alt="like" 
              onClick={handleLike}
            />
            <img 
              className="likeIcon" 
              src="/assets/heart.jpg" 
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
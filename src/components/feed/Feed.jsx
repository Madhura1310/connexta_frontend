import Share from "../share/Share"
import Post from "../post/Post"
import "./feed.css"
import {Posts} from "../../dummydata"

export default function feed() {
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share/>
        {Posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
        <Post/>
         
      </div>
    </div>
  )
}

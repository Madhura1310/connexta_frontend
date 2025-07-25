import "./sidebar.css"
import {RssFeed,
  Chat,
  PlayCircle,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@mui/icons-material";
import {Users} from "../../dummydata";
import Closefriend from "../CloseFriend/Closefriend";

export default function sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarwrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
           <RssFeed className = "sidebarIcon"/>
           <span className="sidebarListItemText">Feed</span>
          </li>

          <li className="sidebarListItem">
           <Chat className = "sidebarIcon"/>
           <span className="sidebarListItemText">Chat</span>
          </li>

          <li className="sidebarListItem">
           <PlayCircle className = "sidebarIcon"/>
           <span className="sidebarListItemText">Videos</span>
          </li>

          <li className="sidebarListItem">
           <Group className = "sidebarIcon"/>
           <span className="sidebarListItemText">Groups</span>
          </li>

          <li className="sidebarListItem">
           <Bookmark className = "sidebarIcon"/>
           <span className="sidebarListItemText">Bookmarks</span>
          </li>

          <li className="sidebarListItem">
           <HelpOutline className = "sidebarIcon"/>
           <span className="sidebarListItemText">Questions</span>
          </li>

          <li className="sidebarListItem">
           <WorkOutline className = "sidebarIcon"/>
           <span className="sidebarListItemText">Jobs</span>
          </li>

          <li className="sidebarListItem">
           <Event className = "sidebarIcon"/>
           <span className="sidebarListItemText">Events</span>
          </li>

          <li className="sidebarListItem">
           <School className = "sidebarIcon"/>
           <span className="sidebarListItemText">Course</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr"/>
        <ul className="sidebarFriendList">
          { Users.map(u=>(
            <Closefriend key={u.id} user={u}/>
          ))}
        </ul>
      </div>
    </div>
  )
}

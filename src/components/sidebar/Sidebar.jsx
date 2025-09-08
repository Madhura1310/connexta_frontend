// import "./sidebar.css"
// import {RssFeed,
//   Chat,
//   PlayCircle,
//   Group,
//   Bookmark,
//   HelpOutline,
//   WorkOutline,
//   Event,
//   School,
// } from "@mui/icons-material";
// import {Users} from "../../dummydata";
// import { useNavigate } from "react-router-dom";
// import Closefriend from "../CloseFriend/Closefriend";


// export default function Sidebar() {

//   const navigate = useNavigate();

//   return (
//     <div className="sidebar">
//       <div className="sidebarwrapper">
//         <ul className="sidebarList">
//           <li className="sidebarListItem" onClick={() => navigate("/")}>
//            <RssFeed className = "sidebarIcon"/>
//            <span className="sidebarListItemText">Feed</span>
//           </li>

//           <li className="sidebarListItem" onClick={() => navigate("/messenger")}>
//            <Chat className = "sidebarIcon"/>
//            <span className="sidebarListItemText">Chat</span>
//           </li>

//           <li className="sidebarListItem">
//            <PlayCircle className = "sidebarIcon"/>
//            <span className="sidebarListItemText">Videos</span>
//           </li>

//           <li className="sidebarListItem">
//            <Group className = "sidebarIcon"/>
//            <span className="sidebarListItemText">Groups</span>
//           </li>

//           <li className="sidebarListItem">
//            <Bookmark className = "sidebarIcon"/>
//            <span className="sidebarListItemText">Bookmarks</span>
//           </li>

//           <li className="sidebarListItem">
//            <HelpOutline className = "sidebarIcon"/>
//            <span className="sidebarListItemText">Questions</span>
//           </li>

//           <li className="sidebarListItem"  onClick={() => window.location.href = "https://www.linkedin.com/home"}>
//            <WorkOutline className = "sidebarIcon"/>
//            <span className="sidebarListItemText">Jobs</span>
//           </li>

//           <li className="sidebarListItem" onClick={() => window.location.href = "https://www.meetup.com/"}>
//            <Event className = "sidebarIcon"/>
//            <span className="sidebarListItemText">Events</span>
//           </li>

//           <li className="sidebarListItem" onClick={() => window.location.href = "https://alison.com/"}>
//            <School className = "sidebarIcon"/>
//            <span className="sidebarListItemText">Course</span>
//           </li>
//         </ul>
//         <button className="sidebarButton">Show More</button>
//         <hr className="sidebarHr"/>
//         <ul className="sidebarFriendList">
//           { Users.map(u=>(
//             <Closefriend key={u.id} user={u}/>
//           ))}
//         </ul>
//       </div>
//     </div>
//   )
// }
/////////////////////////////////////////////////////////////////////////////

import "./sidebar.css";
import {
  RssFeed,
  Chat,
  PlayCircle,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@mui/icons-material";
import { Users } from "../../dummydata";
import { useNavigate } from "react-router-dom";
import Closefriend from "../CloseFriend/Closefriend";
import { useState } from "react";

// Import extra job platform icons
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WorkIcon from "@mui/icons-material/Work";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";

// Event icons
import VideoCallIcon from "@mui/icons-material/VideoCall"; // Google Meet
import VideocamIcon from "@mui/icons-material/Videocam";   // Zoom
import PeopleIcon from "@mui/icons-material/People";       // Meetup

// Course icons
import MenuBookIcon from "@mui/icons-material/MenuBook";   // Swayam
import SchoolIcon from "@mui/icons-material/School";       // Coursera
import CastForEducationIcon from "@mui/icons-material/CastForEducation"; // Udemy

export default function Sidebar() {
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);
  const [showJobsDropdown, setShowJobsDropdown] = useState(false);
  const [showEventsDropdown, setShowEventsDropdown] = useState(false);
  const [showCoursesDropdown, setShowCoursesDropdown] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const toggleJobsDropdown = () => {
    setShowJobsDropdown(!showJobsDropdown);
  };

  const toggleEventsDropdown = () => {
    setShowEventsDropdown(!showEventsDropdown);
  };

  const toggleCoursesDropdown = () => {
    setShowCoursesDropdown(!showCoursesDropdown);
  };

  return (
    <div className="sidebar">
      <div className="sidebarwrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem" onClick={() => navigate("/")}>
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>

          <li className="sidebarListItem" onClick={() => navigate("/messenger")}>
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chat</span>
          </li>

          <li className="sidebarListItem">
            <PlayCircle className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>

          {showMore && (
            <>
              <li className="sidebarListItem">
                <Group className="sidebarIcon" />
                <span className="sidebarListItemText">Groups</span>
              </li>

              <li className="sidebarListItem">
                <Bookmark className="sidebarIcon" />
                <span className="sidebarListItemText">Bookmarks</span>
              </li>

              <li className="sidebarListItem">
                <HelpOutline className="sidebarIcon" />
                <span className="sidebarListItemText">Questions</span>
              </li>
            </>
          )}

          {/* Jobs dropdown */}
          <li
            className="sidebarListItem"
            onClick={toggleJobsDropdown}
            style={{ cursor: "pointer" }}
          >
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs ▾</span>
          </li>

          {showJobsDropdown && (
            <ul className="jobsDropdown">
              <li
                className="sidebarListItem"
                onClick={() =>
                  (window.location.href = "https://www.linkedin.com/home")
                }
              >
                <LinkedInIcon className="sidebarIcon" />
                <span className="sidebarListItemText">LinkedIn</span>
              </li>
              <li
                className="sidebarListItem"
                onClick={() =>
                  (window.location.href =
                    "https://www.naukri.com/nlogin/login?msg=0&URL=https%3A%2F%2Fmy.naukri.com%3A80")
                }
              >
                <WorkIcon className="sidebarIcon" />
                <span className="sidebarListItemText">Naukri</span>
              </li>
              <li
                className="sidebarListItem"
                onClick={() =>
                  (window.location.href = "https://in.indeed.com/?r=us")
                }
              >
                <BusinessCenterIcon className="sidebarIcon" />
                <span className="sidebarListItemText">Indeed</span>
              </li>
            </ul>
          )}

          {/* Events dropdown */}
          <li
            className="sidebarListItem"
            onClick={toggleEventsDropdown}
            style={{ cursor: "pointer" }}
          >
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events ▾</span>
          </li>

          {showEventsDropdown && (
            <ul className="eventsDropdown">
              <li
                className="sidebarListItem"
                onClick={() =>
                  (window.location.href =
                    "https://workspace.google.com/products/meet/")
                }
              >
                <VideoCallIcon className="sidebarIcon" />
                <span className="sidebarListItemText">Google Meet</span>
              </li>
              <li
                className="sidebarListItem"
                onClick={() => (window.location.href = "https://zoom.us/join")}
              >
                <VideocamIcon className="sidebarIcon" />
                <span className="sidebarListItemText">Zoom</span>
              </li>
              <li
                className="sidebarListItem"
                onClick={() => (window.location.href = "https://www.meetup.com/")}
              >
                <PeopleIcon className="sidebarIcon" />
                <span className="sidebarListItemText">Meetup</span>
              </li>
            </ul>
          )}

          {/* Courses dropdown */}
          <li
            className="sidebarListItem"
            onClick={toggleCoursesDropdown}
            style={{ cursor: "pointer" }}
          >
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Courses ▾</span>
          </li>

          {showCoursesDropdown && (
            <ul className="coursesDropdown">
              <li
                className="sidebarListItem"
                onClick={() =>
                  (window.location.href =
                    "https://swayam.gov.in/nc_details/NPTEL")
                }
              >
                <MenuBookIcon className="sidebarIcon" />
                <span className="sidebarListItemText">Swayam</span>
              </li>
              <li
                className="sidebarListItem"
                onClick={() =>
                  (window.location.href = "https://www.coursera.org/login")
                }
              >
                <SchoolIcon className="sidebarIcon" />
                <span className="sidebarListItemText">Coursera</span>
              </li>
              <li
                className="sidebarListItem"
                onClick={() => (window.location.href = "https://www.udemy.com/")}
              >
                <CastForEducationIcon className="sidebarIcon" />
                <span className="sidebarListItemText">Udemy</span>
              </li>
            </ul>
          )}
        </ul>

        <button className="sidebarButton" onClick={toggleShowMore}>
          {showMore ? "Show Less" : "Show More"}
        </button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {Users.map((u) => (
            <Closefriend key={u.id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
}

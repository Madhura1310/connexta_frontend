// import "./topbar.css"
// import {Search,Person,Chat,Notifications} from "@mui/icons-material"
// import { useContext } from "react"
// import { Link } from "react-router-dom"
// import {AuthContext} from "../../context/AuthContext";

// export default function Topbar() {
  
//   const {user} = useContext(AuthContext);
//   const PF = process.env.REACT_APP_PUBLIC_FOLDER;
//   return (
//      <div className="topbarContainer">
//       <div className="topbarLeft">
//         <Link to="/" style={{textDecoration:"none"}}>
//         <span className="logo">Connexta
//         </span>
//          </Link>
//       </div>
//       <div className="topbarCenter">
//       <div className="searchbar">
//         <Search className="searchIcon"/>
//         <input placeholder="serach for friends,post or viedo " className="searchInput"/>
//       </div>
//       </div>
//       <div className="topbarRight">
//         <div className="topbarLinks">
//           <span className="topbarLink">Homepage</span>
//            <span className="topbarLink">Timeline</span>
//         </div>
//         <div className="topbarIcons">
//           <div className="topbarIconItem">
//             <Person/>
//             <span className="topbarIconBadge">1</span>
//           </div>
//           <div className="topbarIconItem">
//             <Chat/>
//             <span className="topbarIconBadge">2</span>
//           </div>
//           <div className="topbarIconItem">
//             <Notifications/>
//             <span className="topbarIconBadge">3</span>
//           </div>
//         </div>
//         <Link to={`/profile/${user.username}`}>
//         <img src={ user.profilePicture ? PF+user.profilePicture : PF+"noavatra.jpg"} alt="" className="topbarImg" /> </Link>
//       </div>
//      </div>

//   )
// }


////////////////////////////////////////////////////////////////

// import "./topbar.css"
// import { Search, Person, Chat, Notifications } from "@mui/icons-material"
// import { useContext } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import { AuthContext } from "../../context/AuthContext";

// export default function Topbar() {

//   const { user, dispatch } = useContext(AuthContext);
//   const PF = process.env.REACT_APP_PUBLIC_FOLDER;
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("user");  // remove from localStorage
//     dispatch({ type: "LOGOUT" });     // clear context
//     navigate("/login");               // redirect to login
//   };

//   return (
//     <div className="topbarContainer">
//       <div className="topbarLeft">
//         <Link to="/" style={{ textDecoration: "none" }}>
//           <span className="logo">Connexta
//           </span>
//         </Link>
//       </div>
//       <div className="topbarCenter">
//         <div className="searchbar">
//           <Search className="searchIcon" />
//           <input placeholder="serach for friends,post or viedo " className="searchInput" />
//         </div>
//       </div>
//       <div className="topbarRight">
//         <div className="topbarLinks">
//           <span className="topbarLink">Homepage</span>
//           <span className="topbarLink">Timeline</span>
//         </div>
//         <div className="topbarIcons">
//           <div className="topbarIconItem">
//             <Person />
//             <span className="topbarIconBadge">1</span>
//           </div>
//           <div className="topbarIconItem">
//             <Chat />
//             <span className="topbarIconBadge">2</span>
//           </div>
//           <div className="topbarIconItem">
//             <Notifications />
//             <span className="topbarIconBadge">3</span>
//           </div>
//         </div>
//         <Link to={`/profile/${user.username}`}>
//           <img src={user.profilePicture ? PF + user.profilePicture : PF + "noavatra.jpg"} alt="" className="topbarImg" />
//         </Link>
//         <button onClick={handleLogout} className="topbarLogoutButton">Logout</button>
//       </div>
//     </div>
//   )
// }


//////////////////////////// notification top bar ////////////////////
import "./topbar.css"
import { Search, Person, Chat, Notifications } from "@mui/icons-material"
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";
import { io } from "socket.io-client";
import axios from "axios";

export default function Topbar() {

  const { user, dispatch } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const navigate = useNavigate();

  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const newSocket = io("http://localhost:8900", { transports: ["websocket"] });
    setSocket(newSocket);
    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    if (socket && user?._id) {
      socket.emit("addUser", user._id);

      socket.on("getNotification", async (data) => {
        try {
          // Fetch sender details from backend
          const res = await axios.get(`/users?userId=${data.senderId}`);
          const sender = res.data;

          const notification = {
            senderId: data.senderId,
            username: sender.username,
            profilePicture: sender.profilePicture,
            text: data.text,
          };

          setNotifications((prev) => [...prev, notification]);
        } catch (err) {
          console.error("Failed to fetch sender details", err);
        }
      });
    }
  }, [socket, user]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  const handleNotificationClick = (n, index) => {
    navigate(`/messenger?userId=${n.senderId}`);
    setNotifications((prev) => prev.filter((_, i) => i !== index));
    setOpen(false);
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Connexta</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input placeholder="search for friends, post or video" className="searchInput" />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div
            className="topbarIconItem"
            onClick={() => setOpen(!open)}
            style={{ position: "relative", cursor: "pointer" }}
          >
            <Notifications />
            {notifications.length > 0 && (
              <span className="topbarIconBadge">{notifications.length}</span>
            )}

            {open && notifications.length > 0 && (
              <div className="notificationDropdown">
                {notifications.map((n, index) => (
                  <div
                    key={index}
                    className="notificationItem"
                    onClick={() => handleNotificationClick(n, index)}
                  >
                    <img
                      src={n.profilePicture ? PF + n.profilePicture : PF + "noavatra.jpg"}
                      alt=""
                      className="notificationImg"
                    />
                    <div className="notificationText">
                      <b>{n.username}</b>: {n.text}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={user.profilePicture ? PF + user.profilePicture : PF + "noavatra.jpg"}
            alt=""
            className="topbarImg"
          />
        </Link>
        <button onClick={handleLogout} className="topbarLogoutButton">Logout</button>
      </div>
    </div>
  )
}

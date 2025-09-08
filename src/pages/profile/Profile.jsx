// import "./profile.css"
// import Topbar from "../../components/topbar/Topbar";
// import Sidebar from "../../components/sidebar/Sidebar";
// import Feed from "../../components/feed/Feed";
// import Rightbar from "../../components/rightbar/Rightbar";
// import { useState, useEffect } from "react"; 
// import axios from "axios";


// export default function Profile() {
//    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
//    const [users, setUser] = useState({});

//     useEffect( () => {
//         const fetchUser = async() =>{
//         const res = await axios.get(`/api/users?username=ganu`)
//         setUser(res.data)
//         };
//         fetchUser();
//       }, []);

//   return (
//      <>
//          <Topbar/>
//          <div className="profile">
//          <Sidebar/>
//          <div className="profileRight">
//            <div className="profileRightTop">
//             <div className="profileCover">
//             <img  className="profileCoverImg" src={`${PF}post/6.jpg`} alt="" />
//             <img  className="profileUserImg" src={`${PF}person/7.png`} alt="" />
//             </div>
//             <div className="profileInfo">
//               <h4 className="profileInfoName">{users.username}</h4>
//               <span className="profileInfoDesc">{users.desc}</span>
//             </div>
//            </div>
//           <div className="profileRightBottom">
//          <Feed username="ganu"/>
//          <Rightbar profile/>
//          </div>
//          </div>
//          </div>
//          </>
//   )
// }
 

///////////////////////// working profile ///////////////////////

// import "./profile.css";
// import Topbar from "../../components/topbar/Topbar";
// import Sidebar from "../../components/sidebar/Sidebar";
// import Feed from "../../components/feed/Feed";
// import Rightbar from "../../components/rightbar/Rightbar";
// import { useState, useEffect } from "react"; 
// import axios from "axios";
// import { useParams } from "react-router";

// export default function Profile() {
//   const PF = process.env.REACT_APP_PUBLIC_FOLDER;
//   const [user, setUser] = useState({});
//   const username = useParams().username;
  

//  useEffect(()=>{
//   const fetchUser = async () =>{
//     const res = await axios.get(`/users?username=${username}`);
//     setUser(res.data);
//   };
//   fetchUser();
//  }, [username]);

//   return (
//     <>
//       <Topbar/>
//       <div className="profile">
//         <Sidebar/>
//         <div className="profileRight">
//           <div className="profileRightTop">
//             <div className="profileCover">
//               <img className="profileCoverImg" src={user.coverPicture ? PF+user.coverPicture : PF+"nocover.jpg"} alt="" />
//               <img className="profileUserImg" src={user.profilePicture ? PF+user.profilePicture : PF+"noavatra.jpg"} alt="" />
//             </div>
//             <div className="profileInfo">
//               <h4 className="profileInfoName">{user.username}</h4>
//               <span className="profileInfoDesc">{user.desc}</span>
//             </div>
//           </div>
//           <div className="profileRightBottom">
//             <Feed username={username}/>
//             <Rightbar user={user} />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


////////////////// adding dyamic profile page ////////////////


import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username;
  const fileInputRef = useRef(null);

  // Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  // Handle profile picture change
  const handleProfilePicClick = () => {
    fileInputRef.current.click(); // open file dialog
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      // 1. Upload image to backend
      const data = new FormData();
      data.append("file", file);
      const uploadRes = await axios.post("/upload", data);
      const filename = uploadRes.data.filename;

      // 2. Update user with new profilePicture
      await axios.put(`/users/${user._id}`, {
        userId: user._id,
        profilePicture: filename,
      });

      // 3. Refresh user info
      setUser((prev) => ({ ...prev, profilePicture: filename }));
    } catch (err) {
      console.log("Error uploading profile picture:", err);
    }
  };

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "nocover.jpg"
                }
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "noavatra.jpg"
                }
                alt=""
                onClick={handleProfilePicClick}
                style={{ cursor: "pointer" }}
              />
              {/* Hidden input for file upload */}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div> 
      </div>
    </>
  );
}

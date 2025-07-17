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


import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useState, useEffect } from "react"; 
import axios from "axios";
import { useParams } from "react-router";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username;
  

 useEffect(()=>{
  const fetchUser = async () =>{
    const res = await axios.get(`/users?username=${username}`);
    setUser(res.data);
  };
  fetchUser();
 }, [username]);

  return (
    <>
      <Topbar/>
      <div className="profile">
        <Sidebar/>
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img className="profileCoverImg" src={user.coverPicture ? PF+user.coverPicture : PF+"nocover.jpg"} alt="" />
              <img className="profileUserImg" src={user.profilePicture ? PF+user.profilePicture : PF+"noavatra.jpg"} alt="" />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username}/>
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
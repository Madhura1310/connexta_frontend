import "./rightbar.css";
import {Users} from "../../dummydata";
import Online from "../online/Online";

export default function Rightbar({ profile }) {

  const HomeRightbar = () =>{
    return(
      <>
      <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.jpg" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.jpg" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map(u => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    )
  }

  const ProfileRightbar = () =>{
    return (
      <>
      <h4 className="rightbarTitle">User Infomation</h4>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfokey">City</span>
          <span className="rightbarInfoValue">Karnataka</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfokey">From:</span>
          <span className="rightbarInfoValue">Mysore</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfokey">Relationship:</span>
          <span className="rightbarInfoValue">Single</span>
        </div>
      </div>
      <h4 className="rightbarTitle">User Friends</h4>
      <div className="rightbarFollowings">
        <div className="rightbarFollowing">
          <img src="assets/person/1.png" alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName">John Carter</span>
        </div>
         <div className="rightbarFollowing">
          <img src="assets/person/2.png" alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName">John Carter</span>
        </div>
         <div className="rightbarFollowing">
          <img src="assets/person/3.png" alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName">John Carter</span>
        </div>
         <div className="rightbarFollowing">
          <img src="assets/person/4.png" alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName">John Carter</span>
        </div>
         <div className="rightbarFollowing">
          <img src="assets/person/5.png" alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName">John Carter</span>
        </div>
         <div className="rightbarFollowing">
          <img src="assets/person/6.png" alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName">John Carter</span>
        </div>
      </div>
      </>
    )
  }
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
      {profile ? <ProfileRightbar/>: <HomeRightbar/>}
      </div>
    </div>
  );
}

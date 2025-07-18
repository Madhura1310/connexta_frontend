import "./closefriend.css"

export default function Closefriend({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div>
      <li className="sidebarFriend">
          <img  className="sidebarFriendImg" src= {PF+user.profilePicture} alt=""/>
          <span className="sidebarFriendName"> {user.username} </span>
        </li>
    </div>
  )
}

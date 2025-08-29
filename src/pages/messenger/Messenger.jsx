// import "./messenger.css";
// import Conversation from "../../components/conversations/Conversation";
// import Message from "../../components/message/Message";
// import Topbar from "../../components/topbar/Topbar";
// import ChatOnline from "../../components/chatOnline/ChatOnline";
// import { useContext, useState, useEffect } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import axios from "axios";

// export default function Messenger() {
//   const [conversations, setConversations] = useState([]);
//   const [currentChat, setCurrentChat] = useState([null]);
//   const [messages, setMessages] = useState([]);
//   const { user } = useContext(AuthContext);
  
//   useEffect(()=>{
//     const getconversations = async ()=>{
//       try{
//       const res = await axios.get("/conversation/"+user._id);
//       setConversations(res.data);
//       }catch(err){
//         console.log(err)
//       }
//     }
//     getconversations();
//   },[user._id]);

//   return (
//     <>
//     <Topbar/>
//     <div className="messenger">
//       <div className="chatMenu">
//         <div className="chatMenuWrapper">
//             <input placeholder="search for friends" className="ChatMenuInput"/>

//              {conversations.map((c) => (
//               <Conversation conversation={c} currentUser={user} />
//               ))}
             
//         </div>
//       </div>
//       <div className="chatBox">
//         <div className="chatBoxWrapper">
//           {
//             currentChat ?
//           <>
//           <div className="chatBoxTop">
//             <Message/>
//              <Message own={true}/>
//               <Message/>
//               <Message/>
//               <Message/>
//               <Message/>
//               <Message/>
//               <Message/>
//               <Message/>
//               <Message/>
//           </div>
//            <div className="chatBoxBottom">
//             <textarea  className="chatMessageInput" placeholder="write something..."></textarea>
//             <button className="chatSubmmitButton">send</button>
//            </div>
//         </div>
//       </div>
//       <div className="chatOnline">
//         <div className="chatOnlineWrapper">
//           <ChatOnline/>
//         </div>
//       </div>
//     </div>
//     </>
//   )
// }



//////////////////////////////////////////////////////////////////
// import "./messenger.css";
// import Conversation from "../../components/conversations/Conversation";
// import Message from "../../components/message/Message";
// import Topbar from "../../components/topbar/Topbar";
// import ChatOnline from "../../components/chatOnline/ChatOnline";
// import { useContext, useState, useEffect, useRef } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import axios from "axios";
// import { io } from "socket.io-client";

// export default function Messenger() {
//   const [conversations, setConversations] = useState([]);
//   const [currentChat, setCurrentChat] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [arrivalMessage, setArrivalMessage] = useState(null);
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const socket = useRef();
//   const { user } = useContext(AuthContext);
//   const scrollRef = useRef();

//   useEffect(() => {
//     // Initialize socket connection
//     socket.current = io("ws://localhost:8900", {
//       path: "/socket.io",
//       transports: ["websocket"],
//       reconnection: true,
//       reconnectionAttempts: 5,
//       reconnectionDelay: 1000,
//     });

//     // Set up event listeners
//     socket.current.on("connect", () => {
//       console.log("Connected to socket server");
//       if (user) {
//         socket.current.emit("addUser", user._id);
//       }
//     });

//     socket.current.on("getMessage", (data) => {
//       console.log("New message received:", data);
//       setArrivalMessage({
//         sender: data.senderId,
//         text: data.text,
//         createdAt: Date.now(),
//       });
//     });

//     socket.current.on("getUsers", (users) => {
//       console.log("Online users updated:", users);
//       setOnlineUsers(users);
//     //   setOnlineUsers(user.followers.filter((f)=> users.some((u)=> u.userId === f)))
//     });

//     socket.current.on("disconnect", () => {
//       console.log("Disconnected from socket server");
//     });

//     socket.current.on("connect_error", (err) => {
//       console.log("Connection error:", err);
//     });

//     // Cleanup on unmount
//     return () => {
//       if (socket.current) {
//         socket.current.disconnect();
//       }
//     };
//   }, [user]);

//   // Handle arrival messages
//   useEffect(() => {
//     if (arrivalMessage && currentChat?.members.includes(arrivalMessage.sender)) {
//       setMessages((prev) => [...prev, arrivalMessage]);
//     }
//   }, [arrivalMessage, currentChat]);

//   // Fetch conversations
//   useEffect(() => {
//     const getConversations = async () => {
//       try {
//         const res = await axios.get("/conversation/" + user._id);
//         setConversations(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getConversations();
//   }, [user._id]);

//   // Fetch messages when chat changes
//   useEffect(() => {
//     const getMessages = async () => {
//       if (currentChat?._id) {
//         try {
//           const res = await axios.get("/message/" + currentChat._id);
//           setMessages(res.data);
//         } catch (err) {
//           console.log(err);
//         }
//       }
//     };
//     getMessages();
//   }, [currentChat]);

//   // Handle message submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!newMessage.trim() || !currentChat) return;

//     const message = {
//       sender: user._id,
//       text: newMessage,
//       conversationId: currentChat._id,
//     };

//     const receiverId = currentChat.members.find(member => member !== user._id);

//     try {
//       // Send message via HTTP
//       const res = await axios.post("/message", message);
//       setMessages([...messages, res.data]);
//       setNewMessage("");

//       // Send message via socket if receiver is online
//       if (receiverId && onlineUsers.includes(receiverId)) {
//         socket.current.emit("sendMessage", {
//           senderId: user._id,
//           receiverId,
//           text: newMessage,
//         });
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // Auto-scroll to newest message
//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // Check if user is online
//   const isUserOnline = (userId) => {
//     return onlineUsers.includes(userId);
//   };

//   return (
//     <>
//       <Topbar />
//       <div className="messenger">
//         <div className="chatMenu">
//           <div className="chatMenuWrapper">
//             <input
//               placeholder="search for friends"
//               className="ChatMenuInput"
//             />
//             {conversations.map((c) => {
//               const otherUserId = c.members.find(member => member !== user._id);
//               return (
//                 <div 
//                   key={c._id} 
//                   onClick={() => setCurrentChat(c)}
//                   className={`conversation-container ${isUserOnline(otherUserId) ? 'online' : 'offline'}`}
//                 >
//                   <Conversation 
//                     conversation={c} 
//                     currentUser={user} 
//                     isOnline={isUserOnline(otherUserId)}
//                   />
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//         <div className="chatBox">
//           <div className="chatBoxWrapper">
//             {currentChat ? (
//               <>
//                 <div className="chatBoxTop">
//                   {messages.map((m) => (
//                     <div key={m._id || m.createdAt} ref={scrollRef}>
//                       <Message message={m} own={m.sender === user._id} />
//                     </div>
//                   ))}
//                 </div>
//                 <div className="chatBoxBottom">
//                   <div className="online-status">
//                     {isUserOnline(currentChat.members.find(member => member !== user._id)) ? (
//                       <span className="online-dot"></span>
//                     ) : (
//                       <span className="offline-text">Offline</span>
//                     )}
//                   </div>
//                   <textarea
//                     className="chatMessageInput"
//                     placeholder="write something..."
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     value={newMessage}
//                   ></textarea>
//                   <button className="chatSubmmitButton" onClick={handleSubmit}>
//                     send
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <span className="noConversationText">
//                 Open a conversation to start a chat
//               </span>
//             )}
//           </div>
//         </div>
//         <div className="chatOnline">
//           <div className="chatOnlineWrapper">
//             <ChatOnline onlineUsers={onlineUsers} currentId={user._id} setCurrentChat={setCurrentChat}/>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

///// notification ////


import "./messenger.css";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import Topbar from "../../components/topbar/Topbar";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const socket = useRef();
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900", {
      path: "/socket.io",
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.current.on("connect", () => {
      console.log("Connected to socket server");
      if (user) {
        socket.current.emit("addUser", user._id);
      }
    });

    socket.current.on("getMessage", (data) => {
      console.log("New message received:", data);
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });

    socket.current.on("getUsers", (users) => {
      console.log("Online users updated:", users);
      setOnlineUsers(users);
    });

    socket.current.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    socket.current.on("connect_error", (err) => {
      console.log("Connection error:", err);
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [user]);

  useEffect(() => {
    if (arrivalMessage && currentChat?.members.includes(arrivalMessage.sender)) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversation/" + user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await axios.get("/users/friends/" + user._id);
        const uniqueFriends = Array.from(new Map(res.data.map(f => [f._id, f])).values());
        setFriends(uniqueFriends);
      } catch (err) {
        console.log("Error fetching friends:", err);
      }
    };
    getFriends();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      if (currentChat?._id) {
        try {
          const res = await axios.get("/message/" + currentChat._id);
          setMessages(res.data);
        } catch (err) {
          console.log(err);
        }
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentChat) return;

    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(member => member !== user._id);

    try {
      const res = await axios.post("/message", message);
      setMessages([...messages, res.data]);
      setNewMessage("");

      if (receiverId && onlineUsers.includes(receiverId)) {
        socket.current.emit("sendMessage", {
          senderId: user._id,
          receiverId,
          text: newMessage,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const isUserOnline = (userId) => {
    return onlineUsers.includes(userId);
  };

  const handleOpenChat = async (friendId) => {
    try {
      // Check if conversation already exists
      const existingConv = conversations.find(c => c.members.includes(friendId));
      
      if (existingConv) {
        setCurrentChat(existingConv);
      } else {
        const newConv = await axios.post("/conversation", {
          senderId: user._id,
          receiverId: friendId,
        });
        setCurrentChat(newConv.data);
        setConversations(prev => [...prev, newConv.data]);
      }
    } catch (err) {
      console.log("Error opening chat:", err);
    }
  };

  // Get friends who don't have conversations yet
  const getFriendsWithoutConversations = () => {
    const friendsWithConvs = new Set();
    conversations.forEach(conv => {
      const friendId = conv.members.find(member => member !== user._id);
      if (friendId) friendsWithConvs.add(friendId);
    });
    
    return friends.filter(friend => !friendsWithConvs.has(friend._id));
  };

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              placeholder="search for friends"
              className="ChatMenuInput"
            />
            {/* Display existing conversations */}
            {conversations.map((c) => {
              const otherUserId = c.members.find(member => member !== user._id);
              return (
                <div 
                  key={c._id} 
                  onClick={() => setCurrentChat(c)}
                  className={`conversation-container ${isUserOnline(otherUserId) ? 'online' : 'offline'}`}
                >
                  <Conversation 
                    conversation={c} 
                    currentUser={user} 
                    isOnline={isUserOnline(otherUserId)}
                  />
                </div>
              );
            })}
            
            {/* Display friends without conversations */}
            {getFriendsWithoutConversations().map((f) => (
              <div 
                key={f._id} 
                onClick={() => handleOpenChat(f._id)}
                className={`conversation-container ${isUserOnline(f._id) ? 'online' : 'offline'}`}
              >
                <img
                  src={f.profilePicture || "/assets/person/noAvatar.png"}
                  alt=""
                  className="conversationImg"
                />
                <span className="conversationName">{f.username}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div key={m._id || m.createdAt} ref={scrollRef}>
                      <Message message={m} own={m.sender === user._id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <div className="online-status">
                    {isUserOnline(currentChat.members.find(member => member !== user._id)) ? (
                      <span className="online-dot"></span>
                    ) : (
                      <span className="offline-text">Offline</span>
                    )}
                  </div>
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmmitButton" onClick={handleSubmit}>
                    send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline onlineUsers={onlineUsers} currentId={user._id} setCurrentChat={setCurrentChat}/>
          </div>
        </div>
      </div>
    </>
  );
}
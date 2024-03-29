// Chat.js
import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import LogoSearch from "../../components/logoSearch/LogoSearch";
import { useSelector } from "react-redux";
import { userChats } from "../../api/ChatRequest";
import Conversation from "../../components/Conversations/Conversation";
import { Link } from "react-router-dom";
import { UilSetting } from "@iconscout/react-unicons";
import Home1 from "../../img/Home1.png";
import Notification from "../../img/noti.png";
import Comment from "../../img/comment.png";
import ChatBox from "../../components/ChatBox/ChatBox";
import { io } from "socket.io-client";
import { getFollowedUsers } from "../../api/UserRequest.js";

function Chat() {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);
  const [followedUsers, setFollowedUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const socket = useRef();

  useEffect(() => {
    const fetchFollowedUsers = async () => {
      try {
        const response = await getFollowedUsers(user._id);
        setFollowedUsers(response.data);
      } catch (error) {
        console.error("Error fetching followed users: ", error);
      }
    };
    fetchFollowedUsers();
  }, [user._id]);

  // Inside Chat.js

useEffect(() => {
  // Load notifications from local storage
  const storedNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
  setNotifications(storedNotifications);
 
  socket.current = io("http://localhost:3002");
  socket.current.emit("new-user-add", user._id);
  socket.current.on("get-users", (users) => {
     setOnlineUsers(users);
  });
 
  socket.current.on("receive-notification", (data) => {
     const updatedNotifications = [...notifications, data.message];
     setNotifications(updatedNotifications);
     // Save notifications to local storage
     localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  });
 
  return () => {
     socket.current.disconnect();
  };
 }, [user]);
 
  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      setReceiveMessage(data);
    });
  }, []);
  
   
   
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data);
      } catch (error) {
        console.log("Chat error: ", error);
      }
    };
    getChats();
  }, [user]);

   const handleSendMessage = (message) => {
    socket.current.emit("send-message", message);
  };

  return (
    <div className="Chat">
      <div className="Left-side-chat">
        <LogoSearch />
        {/* <div className="notifications">
          <ul>
          {notifications.map((notification, index) => (
    <div key={index} className="notification">
      {notification}
    </div>
  ))}
          </ul>
       
        </div> */}
       
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {followedUsers.map((user) => (
              <div
                onClick={() => setCurrentChat(user)}
                key={user._id}
              >
                <Conversation
                  data={user}
                  currentUserId={user._id}
                  onlineUsers={onlineUsers}
                />
              </div>
            ))}
            {chats.map((chat) => (
              <div
                onClick={() => setCurrentChat(chat)}
                key={chat._id}
              >
                <Conversation
                  data={chat}
                  currentUserId={user._id}
                  onlineUsers={onlineUsers}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          <div className="navIcons">
            <Link to="../home">
              <img src={Home1} alt="Home" />
            </Link>
            <UilSetting />
            <img src={Notification} alt="Notifications" />
            <Link to="../chat">
              <img src={Comment} alt="Comment" />
            </Link>
          </div>
        </div>
        <ChatBox
          chat={currentChat}
          currentUser={user._id}
          selectedUser={currentChat} // Pass selected user to ChatBox
          setSendMessage={handleSendMessage}
          receiveMessage={receiveMessage}
          userData={currentChat}
        />
      </div>
    </div>
  );
}

export default Chat;

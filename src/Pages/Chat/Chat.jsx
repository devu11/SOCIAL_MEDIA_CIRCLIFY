import React, { useEffect, useState, useRef } from "react";
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
  const [lastMessages, setLastMessages] = useState({});
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

  useEffect(() => {
    const storedNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
    setNotifications(storedNotifications);
   
    socket.current = io("https://circlify.shop");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
       setOnlineUsers(users);
    });
   
    socket.current.on("receive-notification", (data) => {
       const updatedNotifications = [...notifications, data.message];
       setNotifications(updatedNotifications);
       localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    });
   
    return () => {
       socket.current.disconnect();
    };
  }, [user]);
   
  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      setReceiveMessage(data);
   
      setLastMessages((prevMessages) => ({
        ...prevMessages,
        [data.chatId]: data,
      }));
    });
  }, []);

  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        const sortedChats = data.sort(
          (a, b) => new Date(b.lastMessage.timestamp) - new Date(a.lastMessage.timestamp)
        );
        setChats(sortedChats);
        // Initialize last messages for each conversation
        const initialLastMessages = {};
        data.forEach((chat) => {
          initialLastMessages[chat._id] = chat.lastMessage;
        });
        setLastMessages(initialLastMessages);
      } catch (error) {
        console.log("Chat error: ", error);
      }
    };
    getChats();
  }, [user]);

  const handleSendMessage = (message) => {
    socket.current.emit("send-message", message);
    // Update the last message for the conversation
    setLastMessages((prevMessages) => ({
      ...prevMessages,
      [message.chatId]: message,
    }));
  };

  return (
    <div className="Chat">
      <div className="Left-side-chat">
        <LogoSearch setCurrentChat={setCurrentChat} />
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {followedUsers.map((user) => (
              <div key={user._id} onClick={() => setCurrentChat(user)}>
                <Conversation
                  data={user}
                  currentUserId={user._id}
                  onlineUsers={onlineUsers}
                  lastMessage={lastMessages[user._id]}
                />
              </div>
            ))}
            {chats.map((chat) => (
              <div key={chat._id} onClick={() => setCurrentChat(chat)}>
                <Conversation
                  data={chat}
                  currentUserId={user._id}
                  onlineUsers={onlineUsers}
                  lastMessage={lastMessages[user._id]}
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


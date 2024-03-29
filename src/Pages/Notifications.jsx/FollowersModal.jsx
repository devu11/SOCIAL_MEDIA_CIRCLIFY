import React,{useState,useEffect, useRef} from "react";
import { io } from "socket.io-client";
import "./FollowersModal.css";
import { useSelector } from "react-redux";

function FollowersModal({  onClose }) {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [notifications, setNotifications] = useState([]);
  const socket = useRef();

  useEffect(() => {
    
    const storedNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
    setNotifications(storedNotifications);

    socket.current = io("http://localhost:3002");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      
    });

    return () => {
      socket.current.disconnect();
    };
 }, [user]);
   
 useEffect(() => {
  socket.current.on("receive-notification", (data) => {
    setNotifications((prevNotifications) => [...prevNotifications, data.message]);
    localStorage.setItem('notifications', JSON.stringify([...notifications, data.message]));
  });
  

  return () => {
    socket.current.off("receive-notification");
  };
}, []);


   
  return (
    <div className="modal-background">
      <div className="modal-content">
        <h2>Notifications</h2>
        <h5>Chat Notifications</h5>
        <div className="notifications">
          
        {notifications.map((notification, index) => (
            <div key={index} className="notification">
              <span className="message">{notification}</span>
            </div>
          ))}
        </div>
        <button className="buttonModal" onClick={onClose}>Close</button>
      
      </div>
      
    </div>
  );
}


export default FollowersModal;

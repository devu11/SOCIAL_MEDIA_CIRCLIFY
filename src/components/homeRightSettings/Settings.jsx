import React,{useState} from "react";
import { FaCog, FaBell, FaUser,FaComments } from 'react-icons/fa';
import './Settings.css';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import FollowersModal from "../../Pages/Notifications.jsx/FollowersModal";



function Settings(){
    const { user } = useSelector((state) => state.authReducer.authData)|| {};
    const [showModal, setShowModal] = useState(false);
  const [followers, setFollowers] = useState([]); 
  const handleModalOpen = () => {

    setFollowers([]); 
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };
    
    return(
        <div className="settings-container">
            <div className="setting-item">
                <FaCog />
                <span>Settings</span>
            </div>
            <div className="setting-item">
        <FaBell />
        <span style={{cursor:"pointer "}}onClick={handleModalOpen}>Notifications</span>
      </div>
      {showModal && (
        <FollowersModal followers={followers} onClose={handleModalClose} />
      )}
            <Link to='../chat'>
            <div className="setting-item">
                <FaComments />
                <span>Chats</span>
            </div>
            </Link>
            
            <div className="setting-item">
                <FaUser />
                <span>
          <Link style={{textDecoration:"none" , color:"inherit"}} to={`/profile/${user._id}`}>My Profile</Link>
        </span>
            </div>
        </div>
    )
}
export default Settings;

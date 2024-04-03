import React, { useState } from "react";
import { FaCog, FaBell, FaUser, FaComments } from 'react-icons/fa';
import './Settings.css';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import FollowersModal from "../../Pages/Notifications.jsx/FollowersModal";
import ProfilePrivacyModal from "../AccountPrivacy/ProfilePrivacyModal";

function Settings() {
 const { user } = useSelector((state) => state.authReducer.authData) || {};
 const [showModal, setShowModal] = useState(false);
 const [showPrivacyModal, setShowPrivacyModal] = useState(false); 

 const handleModalOpen = () => {
    setShowModal(true);
 };

 const handleModalClose = () => {
    setShowModal(false);
 };

 const handlePrivacyModalOpen = () => {
    setShowPrivacyModal(true);
 };

 const handlePrivacyModalClose = () => {
    setShowPrivacyModal(false);
 };

 return (
    <div className="settings-container">
      <div className="setting-item" onClick={handlePrivacyModalOpen}>
        <FaCog />
        <span style={{ cursor: "pointer" }}>Settings</span>
      </div>
      <div className="setting-item">
        <FaBell />
        <span style={{ cursor: "pointer" }} onClick={handleModalOpen}>Notifications</span>
      </div>
      {showModal && (
        <FollowersModal followers={[]} onClose={handleModalClose} />
      )}
      {showPrivacyModal && (
        <ProfilePrivacyModal  onClose={handlePrivacyModalClose} />
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
          <Link style={{ textDecoration: "none", color: "inherit" }} to={`/profile/${user._id}`}>My Profile</Link>
        </span>
      </div>
    </div>
 );
}

export default Settings;

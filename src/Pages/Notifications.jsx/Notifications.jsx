import React, { useState } from "react";
import FollowersModal from "./FollowersModal";
import "./Notifications.css";

function Notifications() {
  const [showModal, setShowModal] = useState(false);
 
  const handleModalOpen = () => {
    
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      <button onClick={handleModalOpen}>View Followers</button>
      {showModal && (
        <FollowersModal  onClose={handleModalClose}  />
      )}
    </div>
  );
}


export default Notifications;

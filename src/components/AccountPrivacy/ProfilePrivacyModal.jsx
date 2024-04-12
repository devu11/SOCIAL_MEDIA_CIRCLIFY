import React, { useState, useEffect } from 'react';
import "./ProfilePrivacyModal.css";
import { useDispatch, useSelector } from "react-redux";
import { updateUserPrivacy } from "../../actions/userAction.js";

function ProfilePrivacyModal({ onClose }) {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.authReducer.authData?.user?._id);
  const [isPrivate, setIsPrivate] = useState(false);
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    setIsPrivate(userId ? localStorage.getItem(`privacy_${userId}`) === 'private' : false);
  }, [userId]);

  const handlePrivacyChange = async () => {
    setLoading(true);
    try {
      const newPrivacy = isPrivate ? 'public' : 'private';
      await dispatch(updateUserPrivacy(newPrivacy)); // Update user privacy
      setIsPrivate(!isPrivate);
      localStorage.setItem(`privacy_${userId}`, newPrivacy);
    } catch (error) {
      console.error("Error updating privacy settings:", error);
    }
    setLoading(false);
  }

  return (
    <div className="profile-privacy-modal">
      <div className="modal-content">
        <h2>Account Settings</h2>
        <div className='account-privacy-toggle'>
          <p>Account Privacy</p>
          <div className="slider-container">
            <input
              type="checkbox"
              id="privacy-toggle"
              checked={isPrivate}
              onChange={handlePrivacyChange}
              disabled={loading}
            />
            <label htmlFor="privacy-toggle" className="slider-label">
              {loading ? 'Loading...' : (isPrivate ? 'Private' : 'Public')}
            </label>
          </div>
        </div>
        <div className='close'>
          <button onClick={onClose} className='privacyClose'>close</button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePrivacyModal;

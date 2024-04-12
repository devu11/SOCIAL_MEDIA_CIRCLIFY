import React from "react";
import { useDispatch } from "react-redux";
import { unFollowUser } from "../../actions/userAction";
import "./FollowingModal.css";

function FollowingModal({ onClose, followingUsers }) {
  const dispatch = useDispatch();
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const handleUnfollow = (userId) => {
    dispatch(unFollowUser(userId));
  };

  return (
    <div className="FollowingModalBackground">
      <div className="FollowingModal">
        <h2>Following</h2>
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        <div className="following-list">
          {followingUsers.map((followingUser) => (
            <div key={followingUser._id} className="following-user">
              <img
                src={
                  followingUser.profilePicture
                    ? serverPublic + followingUser.profilePicture
                    : serverPublic + "defaultProfile.png"
                }
                alt=""
              />
              <div className="user-details">
                <span>
                  {followingUser.firstname} {followingUser.lastname}
                </span>
                <span className="username">{followingUser.username}</span>
              </div>
              <button className="unbtn" onClick={() => handleUnfollow(followingUser._id)}>
                Unfollow
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default FollowingModal;

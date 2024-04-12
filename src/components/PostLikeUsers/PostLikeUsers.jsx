import React from "react";
import { useDispatch } from "react-redux";
import { followUser, unFollowUser } from "../../actions/userAction";
import UserProfileModal from "../../Pages/ProfilePage/UserProfileView";
import "./PostLikeUsers.css";

function PostLikes({ likers, onClose }) {
  const dispatch = useDispatch();
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleFollow = (userId) => {
    dispatch(followUser(userId));
  };

  const handleUnfollow = (userId) => {
    dispatch(unFollowUser(userId));
  };

  return (
    <div className="likers-modal">
      <div className="modal-content">
        <h2>Likers</h2>
        <button onClick={onClose}>Close</button>
        <div className="likers-list">
          {likers.map((liker) => (
            <div key={liker._id} className="liker">
              <img
                src={
                  liker.profilePicture
                    ? serverPublic + liker.profilePicture
                    : serverPublic + "defaultProfile.png"
                }
                alt={liker.username}
              />
              <span>{liker.firstname} {liker.lastname} - {liker.username}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default PostLikes;

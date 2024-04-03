import React, { useState, useEffect } from "react";
import "./UserProfileView.css";
import { useSelector } from "react-redux";

function UserProfileModal({ user, onClose }) {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const posts = useSelector((state) => state.postReducer.posts); // Access posts from Redux state
  const userPosts = posts.filter((post) => post.userId === user._id); // Filter posts by the user ID
  const userId = useSelector(state => state.authReducer.authData?.user?._id);
  const [isPrivate, setIsPrivate] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);


  useEffect(() => {
    setIsPrivate(user.isPrivate);
    setIsFollowing(user.followers.includes(userId) || user.following.includes(userId));
  }, [user, userId]);
  


  return (
    <div className="user-profile-modal">
      <div className="modal-content">
        {isPrivate && !isFollowing ? (
          <div>
            <h2>This account is private.</h2>
            <p>Only approved followers can view the details.</p>
            <button onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            <div>
              <img
                src={
                  user.profilePicture
                    ? `${serverPublic}${user.profilePicture}`
                    : `${serverPublic}defaultProfile.png`
                }
                alt="Profile"
              />
              <img
                src={
                  user.coverPicture
                    ? `${serverPublic}${user.coverPicture}`
                    : `${serverPublic}defaultCover.jpg`
                }
                alt="Cover"
              />

              <div className="detailscontent">
                <h2 style={{ color: "black" }}>
                  {user.firstname} {user.lastname}
                </h2>
                <h4>{user.username}</h4>
              </div>

              <div className="detailsOfUser">
                <p>Status: {user.relationship}</p>
                <p>Lives In: {user.livesin}</p>
                <p>Works At: {user.worksAt}</p>
              </div>
            </div>
            <div className="user-posts">
              <h3 style={{ color: "black" }}>Posts</h3>
              {userPosts.map((post, index) => (
                <div key={index} className="post">
                  <img
                    src={
                      post.image
                        ? process.env.REACT_APP_PUBLIC_FOLDER + post.image
                        : ""
                    }
                    alt=""
                  />
                  {post.video && (
                    <video src={serverPublic + post.video} controls />
                  )}
                </div>
              ))}
            </div>

            <div className="profileclosebutton">
              <button onClick={onClose}>Close</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default UserProfileModal;

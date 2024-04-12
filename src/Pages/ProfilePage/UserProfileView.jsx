import React, { useState, useEffect } from "react";
import "./UserProfileView.css";
import { useSelector } from "react-redux";
import { addMessage } from "../../api/MessageRequest.js";
import { useNavigate } from "react-router-dom";

function UserProfileModal({ user, onClose }) {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const posts = useSelector((state) => state.postReducer.posts);
  const userId = useSelector((state) => state.authReducer.authData?.user?._id);
  const [newMessage, setNewMessage] = useState("");
  const currentUser = useSelector((state) => state.authReducer.authData.user);
  const [isPrivate, setIsPrivate] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsPrivate(user.isPrivate);
    setIsFollowing(
      user.followers.includes(currentUser._id) || user.following.includes(currentUser._id)
    );
  }, [user, currentUser]);


  const handleSendMessage = async () => {
    const message = {
      senderId: currentUser._id,
      text: newMessage,
      receiverId: user._id,
    };

    try {
      await addMessage(message);
      setNewMessage("");
      navigate('/chat')
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };



  return (
    <div className="user-profile-modal">
      <div className="modal-content">
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
        {isPrivate && !isFollowing ? (
          <div>
            <h2>This account is private.</h2>
            <p>Only approved followers can view the details.</p>
          </div>
        ) : (
          <>
            {user.bio && <p>{user.bio}</p>}
            <button   onClick={handleSendMessage} >message</button>
            {!isPrivate || isFollowing ? (
              <div className="user-posts">
                <h3 style={{ color: "black" }}>Posts</h3>
                {posts.map(
                  (post, index) =>
                    post.userId === user._id && (
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
                    )
                )}
              </div>
            ) : (
              <p>This account is private.</p>
            )}
          </>
        )}
        <div className="profileclosebutton">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default UserProfileModal;

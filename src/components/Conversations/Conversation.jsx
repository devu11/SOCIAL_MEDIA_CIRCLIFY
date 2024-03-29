import React, { useEffect, useState } from "react";
import { getUser } from "../../api/UserRequest";
import './Conversation.css'

const Conversation = ({ data, currentUserId, onlineUsers }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (data && data._id) {
          const userId = data._id;
          const response = await getUser(userId);
          setUserData(response.data);
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };
    fetchUserData();
  }, [data]);

  const isOnline = userData && onlineUsers.some(user => user.userId === userData._id);

  return (
    <>
      <div className="follower conversation">
        <div>
          {userData ? (
            <>
              {isOnline && <div className="online-dot"></div>}
              <img
                src={
                  userData.profilePicture
                    ? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture
                    : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"
                }
                alt={`${userData.firstname} ${userData.lastname}`}
                className="followerImage"
                style={{ width: "50px", height: "50px" }}
              />
              <div className="name1" style={{ fontSize: "0.8rem" }}>
                <span>
                  {userData.firstname} {userData.lastname}
                </span><br></br>
                <span>{isOnline ? "Online" : "Offline"}</span> 
              </div>
            </>
          ) : (
            <>
              <img
                src={process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"}
                alt="Default Profile"
                className="followerImage"
                style={{ width: "50px", height: "50px" }}
              />
              <div className="name1" style={{ fontSize: "0.8rem" }}>
                <span>Loading...</span>
              </div>
            </>
          )}
        </div>
      </div>
      <hr
        className="hr"
        style={{ width: "85%", border: "0.1px solid #ececec" }}
      />
    </>
  );
};

export default Conversation;

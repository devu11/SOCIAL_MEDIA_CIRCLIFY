import React, { useRef } from "react";
import "./ProfileCard.css";
// import camera from "../../img/camera.jpg"

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { uploadImage } from "../../actions/uploadAction";
import { updateUser } from "../../actions/userAction";

function ProfileCard({location}) {
  const { user } = useSelector((state) => state.authReducer.authData)|| {};
  const posts = useSelector((state)=> state.postReducer.posts)
  const dispatch = useDispatch();
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const fileInputRefCover = useRef(null);
  const fileInputRefProfile = useRef(null);

  if (!user || user === null  || !user._id) {
    return null;
  }

  const handleImageClick = (fileInputRef) => {

    fileInputRef.current.click();
  };

  const handleFileChange = async(event,imageType) => {
   try{
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const data = new FormData();
      const fileName = Date.now() + selectedFile.name;
      data.append("name", fileName);
      data.append("file", selectedFile);

      
      dispatch(uploadImage(data));

      const updatedUserData = {
        ...user,
        [imageType]: fileName,
     
      };
      await dispatch(updateUser(user._id, updatedUserData));

    }
  }catch(error){
    console.log("Error Updating Profile:", error)

  }
    
  };

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img onClick={()=> fileInputRefCover.current.click()}
          src={
            user.coverPicture
              ? serverPublic + user.coverPicture
              : serverPublic + "defaultCover.jpg"
          }
          alt=""
        />
         <input
          type="file"
          style={{ display: "none" }}
          ref={fileInputRefCover}
          onChange={(e) => handleFileChange(e, "coverPicture")}
        />
        
        <img onClick={() => fileInputRefProfile.current.click()}
          src={
            user.profilePicture
              ? serverPublic + user.profilePicture
              : serverPublic + "defaultProfile.png"
          }
          alt=""
        />
         <input
          type="file"
          style={{ display: "none" }}
          ref={fileInputRefProfile}
          onChange={(e) => handleFileChange(e, "profilePicture")}
        />
      </div>

      <div className="ProfileName">
        <span>
          {user.firstname} {user.lastname}
        </span>
        <span>{user.worksAt}</span>
      </div>

      <div className="FollowStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user.following.length}</span>
            <span>Following</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user.followers.length}</span>
            <span>Followers</span>
          </div>


          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>
                {posts.filter((post) => post && post.userId === user._id).length}
                  </span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {location === "profilePage" ? (
        ""
      ) : (
        <span>
          <Link style={{textDecoration:"none" , color:"inherit"}} to={`/profile/${user._id}`}>My Profile</Link>
        </span>
      )}
    </div>
  );
}
export default ProfileCard;

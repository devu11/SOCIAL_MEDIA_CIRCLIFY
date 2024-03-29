import React, { useEffect, useState } from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../profileModal/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as UserApi from "../../api/UserRequest.js";
import { logOut } from "../../actions/AuthAction.js";

function InfoCard() {
  const [modalOpened, setModalOpened] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const params = useParams();

  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});

  const {user} = useSelector((state)=>state.authReducer.authData)
 
 
  useEffect(() => {
    const fetchProfileUser = async () => {
      if (user &&user._id && profileUserId === user._id) {
        setProfileUser(user)
      } else if(user && user._id) {
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser);
      }
    };
    if(user && user._id){
      fetchProfileUser();
    }
  }, [user,profileUserId]);



  const handleLogout = () => {
    dispatch(logOut());
    navigate('/auth')
    
  };

  return (
    <div className="InfoCard">
      <div className="infoHead">
        {/* <h4>Profile Info</h4> */}
        {user._id === profileUserId && (
          <div>
            <UilPen
              width="2rem"
              height="1.2rem"
              onClick={() => setModalOpened(true)}
            />

            {/* <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data = {user}
            /> */}
          </div>
        
        )}
      </div>
      <div className="info">
        <span>
          <b>Status</b>
        </span>
        <span>{profileUser.relationship}</span>
      </div>

      <div className="info">
        <span>
          <b>Lives In</b>
        </span>
        <span>{profileUser.livesin}</span>
      </div>

      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <span> {profileUser.worksAt}</span>
      </div>

      <button className="button logout-button" onClick={handleLogout}>
        Logout
      </button>
      {modalOpened && (
        <ProfileModal
          modalOpened={modalOpened}
          setModalOpened={setModalOpened}
          data={user}
        />
      )}
    </div>
  );
}
export default InfoCard;

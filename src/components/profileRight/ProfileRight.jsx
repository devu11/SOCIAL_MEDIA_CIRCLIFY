import React,{useState} from "react";
import './ProfileRight.css';
import Home1 from '../../img/Home1.png';
import Notification from '../../img/noti.png';
import Comment from '../../img/comment.png';
import {UilSetting} from '@iconscout/react-unicons';
import TrendCard from "../trendCard/TrendCard";
import ShareModal from "../shareModal/ShareModal";
import { Link } from "react-router-dom";
import FollowersCard from "../followersCard/FollowersCard";



function ProfileRight(){

  const [modalOpened, setModalOpened] = useState(false);

    return(
        <div className="RightSide">
  <div className="navIcons">
    <Link to='../home'>
    <img src={Home1} alt="Home" />
    </Link>
    <UilSetting/>
    <img src={Notification} alt="Notifications" />
    <Link to='../chat'>
    <img src={Comment} alt="Comment" />
    </Link>
    

  </div>
{/* <TrendCard/> */}
<FollowersCard/>
<button className="button r-button" onClick={()=> setModalOpened(true)}>

Share
</button>
<ShareModal
            modalOpened={modalOpened}
            setModalOpened={setModalOpened}
          />


        </div>
    )
}
export default ProfileRight;
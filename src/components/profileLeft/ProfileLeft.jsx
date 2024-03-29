import React from "react";
import './ProfileLeft.css';
import LogoSearch from '../logoSearch/LogoSearch'
import FollowersCard from "../followersCard/FollowersCard";
import InfoCard from "../infoCard/InfoCard";

function ProfileLeft(){
    return(
        <div className="ProfileSide">
           <LogoSearch/>
           <InfoCard/>
        </div>
    )
}
export default ProfileLeft;
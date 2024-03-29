import React from "react";
import LogoSearch from "../logoSearch/LogoSearch";
import ProfileCard from "../profileCard/ProfileCard";
import './ProfileSide.css';
import FollowersCard from "../followersCard/FollowersCard";
import Settings from "../homeRightSettings/Settings";

function ProfileSide(){
    return(
        <div className="ProfileSide">
<LogoSearch/>

{/* <ProfileCard  location="homepage"/> */}
<Settings location="homepage"/>

        </div>
    )
}
export default ProfileSide;
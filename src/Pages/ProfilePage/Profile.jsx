import React from "react";
import "./Profile.css";
import ProfileLeft from "../../components/profileLeft/ProfileLeft";
import ProfileCard from "../../components/profileCard/ProfileCard";
import ProfileRight from "../../components/profileRight/ProfileRight";

import PostSide from "../../components/postSide/PostSide";
import { MantineProvider } from "@mantine/core";
function Profile() {
  return (
    <MantineProvider>
    <div className="profile">
      <ProfileLeft />
      <div className="Profile-center">
        <ProfileCard  location= "profilePage"  />
        <PostSide />
      </div>
      <ProfileRight />
    </div>
    </MantineProvider>
  );
}

export default Profile;

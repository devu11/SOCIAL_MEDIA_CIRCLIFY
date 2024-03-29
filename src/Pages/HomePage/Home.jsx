import React from "react";
import "./Home.css"
import ProfileSide from "../../components/profileSide/ProfileSide";
import PostSide from "../../components/postSide/PostSide";
import ProfileRight from "../../components/profileRight/ProfileRight";


function Home(){
      return(
        <div className="home">
         <ProfileSide/>
          <PostSide/>
          <ProfileRight/>
          
        </div>
    )
}
export default Home;
import { Modal } from "@mantine/core";
import './ProfileModal.css'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadImage } from "../../actions/uploadAction";
import { updateUser } from "../../actions/userAction";
import Swal from 'sweetalert2';

function ProfileModal({ modalOpened, setModalOpened,data }) {
  
  const {password, ...other} = data;
  const [formData,setFormData] = useState(other);
  const [profileImage,setProfileImage] = useState(null);
  const [coverImage,setCoverImage] = useState(null)
  const dispatch =useDispatch();
  const param = useParams()
  const {user} = useSelector((state)=>state.authReducer.authData)
  
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]: e.target.value})
  }


  const onImageChange=(event)=>{
if(event.target.files && event.target.files[0]){
  let img = event.target.files[0];
  event.target.name === "profileImage"
  ? setProfileImage(img)
  :setCoverImage(img);
}
  };


const handleSubmit =(e)=>{
  e.preventDefault();
  let UserData = formData;
  if(profileImage){
    const data = new FormData();
    const fileName =Date.now( )+ profileImage.name;
    data.append("name", fileName);
    data.append("file", profileImage)
    UserData.profilePicture = fileName;
try {
  dispatch(uploadImage(data));
  
} catch (error) {
  console.log(error)
}
  }

  if(coverImage){
    const data = new FormData();
    const fileName =Date.now( )+ coverImage.name;
    data.append("name", fileName);
    data.append("file", coverImage)
    UserData.coverPicture = fileName;
try {
  dispatch(uploadImage(data));
  
} catch (error) {
  console.log(error)
}
  }
  dispatch(updateUser(param.id, UserData));

  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Updated Successfully",
    showConfirmButton: false,
    timer: 1500,
  });
  setModalOpened(false)

}
  
  return (
    <>
       <Modal
        className="custom-modal" 
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        closeButtonProps={{
          style: {
            width: "30px",
            height: "30px",
          },
        }}
      />
      
        <form className="infoForm1">
          <h3>Your Info</h3>
          <div>
            
            <input
              type="text"
              className="infoInput1"
              name="firstname"
              placeholder="First Name"
              onChange={handleChange}
              value={formData.firstname}
            />
            
            <input
              type="text"
              className="infoInput1"
              name="lastname"
              placeholder="Last Name"
              onChange={handleChange}
              value={formData.lastname}
            />

<input
              type="email"
              className="infoInput1"
              name="username"
              placeholder="Email"
              onChange={handleChange}
              value={formData.username}
            />
            
                        <input
              type="text"
              className="infoInput1"
              name="worksAt"
              placeholder="works at"
              onChange={handleChange}
              value={formData.worksAt}
            />
            
            
          
            
            <input
              type="text"
              className="infoInput1"
              name="livesin"
              placeholder="livesIn"
              onChange={handleChange}
              value={formData.livesin}
            />
           
            <input
              type="text"
              className="infoInput1"
              name="country"
              placeholder="Country"
              onChange={handleChange}
              value={formData.country}
            />
           
          </div>
          
          <div className="relationshipStatus">
            <input
              type="text"
              className="infoInput1"
              placeholder="Relationship Status"
              name="relationship"
              onChange={handleChange}       
              value={formData.relationship}     />
          </div>
          <div className="UserProfileImg">
            Profile Image
            <input type="file" name="profileImage"  onChange={onImageChange}/>
            <br/>
            Cover Image
            <input type="file" name="coverImage" onChange={onImageChange}/>
          </div>
          <button className="button infoButton"  onClick={handleSubmit} >Update
          </button>
        </form>
     
    </>
  );
}
export default ProfileModal;

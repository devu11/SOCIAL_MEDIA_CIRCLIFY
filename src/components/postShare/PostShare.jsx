import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost, uploadVideo } from "../../actions/uploadAction.js";
import "./PostShare.css";
import {
 UilScenery,
 UilPlayCircle,
 UilLocationPoint,
 UilSchedule,
 UilTimes,
} from "@iconscout/react-unicons";
import Swal from 'sweetalert2';
import { FaGreaterThan, FaLessThan } from "react-icons/fa";

function PostShare() {
 const loading = useSelector((state) => state.postReducer.uploading);
 const [images, setImages] = useState([]);
 const [currentImageIndex, setCurrentImageIndex] = useState(0);
 const [showImagePreview, setShowImagePreview] = useState(false); 
 const imageRef = useRef();
 const [video, setVideo] = useState(null);
 const videoRef = useRef();
 const desc = useRef();
 const dispatch = useDispatch();
 const { user } = useSelector((state) => state.authReducer.authData);
 const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

 const onImageChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      let imgs = Array.from(event.target.files);
      setImages(imgs);
      setCurrentImageIndex(0); 
      setShowImagePreview(true); 
    }
 };

 const onVideoChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let vid = event.target.files[0];
      setVideo(vid);
    }
 };

 const reset = () => {
    setImages([]);
    setVideo(null);
    desc.current.value = "";
    if (imageRef.current) imageRef.current.value = "";
    if (videoRef.current) videoRef.current.value = "";
 };

 const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
 };

 const handleNextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
 };

 const handlesubmit = async (e) => {
    e.preventDefault();

    if (!images.length && !video) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please select an image or video',
      });
      return;
    }

    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    let imageData = [];
    let videoData = null;

    if (images.length) {
      imageData = new FormData();
      const imageFilename = Date.now() + images[currentImageIndex].name;
      imageData.append("name", imageFilename);
      imageData.append("file", images[currentImageIndex]);
      newPost.image = imageFilename;
    }

    if (video) {
      videoData = new FormData();
      const videoFilename = Date.now() + video.name;
      videoData.append("name", videoFilename);
      videoData.append("file", video);
      newPost.video = videoFilename;
    }

    try {
      if (images.length) await dispatch(uploadImage(imageData));
      if (video) await dispatch(uploadVideo(videoData));
      await dispatch(uploadPost(newPost));
      reset();
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Post uploaded successfully',
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An error occurred while uploading the post',
      });
    }
 };

 return (
    <div className="PostShare">
      <img
        src={
          user.profilePicture
            ? serverPublic + user.profilePicture
            : serverPublic + "defaultProfile.png"
        }
        alt=""
      />
      <div>
        <input
          type="text"
          ref={desc}
          required
          placeholder="Post Description...."
        />

        <div className="postOptions">
          <div
            className="options"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>
          <div className="options"
           style={{ color: "var(--video)" }}
           onClick={() => videoRef.current.click()}
           >
            <UilPlayCircle />
            Video
          </div>
          <div className="options" style={{ color: "var(--location)" }}>
            <UilLocationPoint />
            Location
          </div>
          <div className="options" style={{ color: "var(--schedule)" }}>
            <UilSchedule />
            Schedule
          </div>
          
          <button className="button ps-button" onClick={handlesubmit}>{loading ? "Uploading..." : "Share"}</button>
          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
              multiple
            />
            <input
              type="file"
              name="myVideo"
              ref={videoRef}
              onChange={onVideoChange}
              accept="video/*"
            />
          </div>
        </div>

        {showImagePreview && images.length > 0 && ( 
          <div className="imagePreview">
            <FaLessThan onClick={handlePrevImage} />
            <img src={URL.createObjectURL(images[currentImageIndex])} alt="" />
            <FaGreaterThan onClick={handleNextImage} />
          </div>
        )}


        {video && (
          <div className="previewVideo">
            <UilTimes onClick={() => setVideo(null)} />
            <video src={URL.createObjectURL(video)} alt="" controls />
          </div>
        )}



      </div>
    </div>
 );
}

export default PostShare;




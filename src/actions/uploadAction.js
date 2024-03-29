import * as UploadApi from '../api/UploadRequest.js'

export const uploadImage = (postData)=> async(dispatch)=>{
    try {
        await UploadApi.uploadImage(postData)
        
    } catch (error) {
        console.log(error)
    }
}
export const uploadVideo = (videoData) => async (dispatch) => {
  dispatch({ type: "UPLOAD_VIDEO_START" });
  try {
     await UploadApi.uploadVideo(videoData);
     dispatch({ type: "UPLOAD_VIDEO_SUCCESS" });
  } catch (error) {
     dispatch({ type: "UPLOAD_VIDEO_FAILURE" });
     console.error("Error uploading video:", error);
     throw error;
  }
 };


export const uploadPost = (postData) => async (dispatch) => {
    dispatch({ type: "UPLOAD_START" });
    try {
      const newPost = await UploadApi.uploadPost(postData);
      dispatch({ type: "UPLOAD_SUCCESS", data: newPost.data });
    } catch (error) {
      dispatch({ type: "UPLOAD_FAIL" });
      console.error("Error uploading post:", error);
      throw error;
    }
  };
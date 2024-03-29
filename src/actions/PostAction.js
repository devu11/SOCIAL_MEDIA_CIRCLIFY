import * as PostApi from "../api/PostRequest.js"


// Example action creator for loading timeline posts asynchronously using redux-thunk
export const getTimelinePosts = (userId) => async (dispatch) => {
  dispatch({ type: "RETREIVING_START" }); // Dispatching a plain object action
  try {
    const { data } = await PostApi.getTimelinePosts(userId); // Make sure PostApi.getTimelinePosts returns a Promise
    dispatch({ type: "RETREIVING_SUCCESS", data: data }); // Dispatching a plain object action
  } catch (error) {
    dispatch({ type: "RETREIVING_FAIL" }); // Dispatching a plain object action
    console.error("Error fetching timeline posts:", error); // Use console.error for better error logging
  }
};






export const updatePost = (updatedPost) => async (dispatch) => {
  dispatch({ type: "UPDATE_POST_REQUEST" });
  try {
    const response = await PostApi.updatePost(updatedPost);
    dispatch({ type: "UPDATE_POST_SUCCESS", payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: "UPDATE_POST_FAILURE" });
    console.error("Error updating post:", error);
    throw error;
  }
};



export const deletePost = (postId, userId) => async (dispatch) => {
  dispatch({ type: "DELETE_POST_REQUEST" });
  try {
    await PostApi.deletePost(postId, userId);
    dispatch({ type: "DELETE_POST_SUCCESS", payload: postId }); // Pass postId as payload
  } catch (error) {
    console.error("Error deleting post:", error);
    dispatch({ type: "DELETE_POST_FAILURE" ,payload: error });
    
  }
};



export const likePostRequest = () => ({
  type: "LIKE_POST_REQUEST",
});

export const likePostSuccess = (post) => ({
  type: "LIKE_POST_SUCCESS",
  payload: post,
});

export const likePostFailure = () => ({
  type: "LIKE_POST_FAILURE",
});

export const likePost = (postId, userId) => async (dispatch) => {
  dispatch(likePostRequest());
  try {
    const response = await PostApi.likedPost(postId, userId);
    if (response.status === 200) {
      dispatch(likePostSuccess(response.data));
    } else {
      dispatch(likePostFailure());
    }
  } catch (error) {
    console.error("Error liking post:", error);
    dispatch(likePostFailure());
  }
};


export const addCommentRequest = () => ({
  type: "ADD_COMMENT_REQUEST",
});

export const addCommentSuccess = (postId, comment) => ({
  type: "ADD_COMMENT_SUCCESS",
  payload: { postId, comment },
});

export const addCommentFailure = () => ({
  type: "ADD_COMMENT_FAILURE",
});

export const addComment = (postId, userId, comment) => async (dispatch) => {
  dispatch(addCommentRequest());
  try {
    const response = await PostApi(postId, userId, comment);
    if (response.status === 201) {
      dispatch(addCommentSuccess(postId, comment));
    } else {
      dispatch(addCommentFailure());
    }
  } catch (error) {
    console.error("Error adding comment:", error);
    dispatch(addCommentFailure());
  }
};
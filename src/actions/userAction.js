import * as UserApi from "../api/UserRequest";

export const updateUser = (id, formData) => async (dispatch) => {
  dispatch({ type: "UPDATING_START" });
  try {
    const { data } = await UserApi.updateUser(id, formData);
    dispatch({ type: "UPDATING_SUCCESS", data: data });
  } catch (error) {
    dispatch({ type: "UPDATING_FAIL" });
  }
};

export const followUser = (id, data) => async (dispatch) => {
  dispatch({ type: "FOLLOW_USER", data: id });
  try {
    await UserApi.followUser(id, data);
  } catch (error) {
    console.log("Error following user:", error);
  }
};

export const unFollowUser = (id, data) => async (dispatch) => {
  dispatch({ type: "UNFOLLOW_USER", data: id });
  try {
    await UserApi.unFollowUser(id, data);
  } catch (error) {
    console.log("Error unfollowing user:", error);
  }
};

export const updateUserPrivacy = (isPrivate) => async (dispatch) => {
  dispatch({ type: "UPDATING_PRIVACY_START" });
  try {
    const id = localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')).user._id : null;
    const { data } = await UserApi.updateUserPrivacy(id, { isPrivate });
    dispatch({ type: "UPDATING_PRIVACY_SUCCESS", data });
  } catch (error) {
    dispatch({ type: "UPDATING_PRIVACY_FAIL" });
  }
};
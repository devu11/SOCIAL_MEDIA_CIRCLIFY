import * as AuthApi from "../api/AuthRequest.js";

export const logIn = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.logIn(formData);

    dispatch({ type: "AUTH_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "AUTH_FAIL" });
  }
};

export const signUp = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.signUp(formData);

    dispatch({ type: "AUTH_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "AUTH_FAIL" });
  }
};







export const initiateForgotPassword = (username) => async (dispatch) => {
  dispatch({ type: "AUTH_START_FORGOT" });
  try {
     const { data } = await AuthApi.initiateForgotPassword(username);
     dispatch({ type: "AUTH_SUCCESS_FORGOT", data: data });
  } catch (error) {
     console.log(error);
     dispatch({ type: "AUTH_FAIL_FORGOT" });
  }
 };
 
 export const resetPassword = (username, otp, newPassword) => async (dispatch) => {
  dispatch({ type: "AUTH_START_RESTART" });
  try {
     const { data } = await AuthApi.resetPassword(username, otp, newPassword);
     dispatch({ type: "AUTH_SUCCESS_RESTART", data: data });
  } catch (error) {
     console.log(error);
     dispatch({ type: "AUTH_FAIL_RESTART" });
  }
 };



export const logOut = () => async (dispatch) => {
  dispatch({ type: "LOG_OUT" });
};

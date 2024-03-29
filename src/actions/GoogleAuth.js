// AuthAction.js

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import * as AuthApi from '../api/AuthRequest.js';

export const signUpWithGoogle = (tokenId) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    // Make API request to sign up with Google
    const { data } = await AuthApi.signUpWithGoogle(tokenId);
    // Dispatch action to handle successful sign up
    dispatch({ type: "AUTH_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    // Dispatch action to handle sign up failure
    dispatch({ type: "AUTH_FAIL" });
    // Show error message to user
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: 'An error occurred during Google sign-up. Please try again.',
    });
  }
};

export const logInWithGoogle = (tokenId) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    // Make API request to log in with Google
    const { data } = await AuthApi.logInWithGoogle(tokenId);
    // Dispatch action to handle successful login
    dispatch({ type: "AUTH_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    // Dispatch action to handle login failure
    dispatch({ type: "AUTH_FAIL" });
    // Show error message to user
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: 'An error occurred during Google login. Please try again.',
    });
  }
};

export const logOut = () => async (dispatch) => {
  dispatch({ type: "LOG_OUT" });
};

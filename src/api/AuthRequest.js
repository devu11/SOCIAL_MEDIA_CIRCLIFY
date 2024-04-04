import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const API = axios.create({ baseURL: "https://circlify.shop" });

export const logIn = (formData) =>
  API.post("/auth/login", formData)
  .catch((err) => {
    Swal.fire({
      icon: "error",
      title: "Blocked!",
      text: "User is blocked. You are not allowed to log in.",
    });
  });

export const signUp = (formData) => API.post("/auth/register", formData);

export const verifyOTP = (username, otp) =>
  API.post("/auth/verifyOTP", { username, otp });

export const googleSignIn = (tokenId) =>
  API.post("/auth/googleSignIn", { tokenId });
export const resendOTP = (username) =>
  API.post("/auth/resendOTP", { username });

  export const initiateForgotPassword = (username) =>
 API.post('/auth/initiateForgotPassword', { username });

export const resetPassword = (username, otp, newPassword) => {
  return API.post("/auth/resetpassword", { username, otp, newPassword })
    .then((response) => {
      Swal.fire({
        icon: "success",
        title: "Password Reset Successful",
        text: "Your password has been successfully reset.",
      });
      return response.data; // You may need to modify this depending on your backend response structure
    })
    .catch((error) => {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An unexpected error occurred. Please try again later.",
      });
      throw error;
    });
};
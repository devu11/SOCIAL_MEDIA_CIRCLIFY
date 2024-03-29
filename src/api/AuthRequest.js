import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const API = axios.create({ baseURL: "http://localhost:3001" });

export const logIn = (formData) =>
  API.post("/auth/login", formData).catch((err) => {
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

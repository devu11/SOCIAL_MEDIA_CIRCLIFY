import axios from "axios";

const API = axios.create({baseURL: "http://localhost:3001"});

export const adminLogIn = (formData)=> API.post('/adminLogin',formData);

export const getAllUsers =()=> API.get('/getUser')

export const blockUser =(userId) => API.patch(`/block/${userId}`);
export const unblockUser = (userId) => API.patch(`/unblock/${userId}`)

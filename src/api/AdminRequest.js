import axios from "axios";

const API = axios.create({baseURL: "http://circlify.shop"});

export const adminLogIn = (formData)=> API.post('/adminLogin',formData);

export const getAllUsers =()=> API.get('/getUser')

export const blockUser =(userId) => API.patch(`/block/${userId}`);
export const unblockUser = (userId) => API.patch(`/unblock/${userId}`)

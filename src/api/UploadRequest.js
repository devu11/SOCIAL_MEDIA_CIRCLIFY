import axios from "axios";

const API = axios.create({baseURL: "https://circlify.shop/"})

export const uploadImage = (postData) => API.post('/upload/',postData)

export const uploadVideo = (data) => API.post('/upload/', data);


export const uploadPost = (data)=> API.post('/post',data)
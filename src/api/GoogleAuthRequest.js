import axios from 'axios';
const API = axios.create({baseURL: "http://localhost:3001"})




export const GoogleAuthLogin =(formData) =>API.post('/auth/login',formData)
export const GoogleAuthSignup =(formData)=>API.post('/auth/register',formData)
import axios from 'axios';
const API = axios.create({baseURL: "https://circlify.shop"})




export const GoogleAuthLogin =(formData) =>API.post('/auth/login',formData)
export const GoogleAuthSignup =(formData)=>API.post('/auth/register',formData)
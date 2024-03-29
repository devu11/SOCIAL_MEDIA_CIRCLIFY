import axios from "axios";

const API = axios.create({baseURL:"http://localhost:3001"})


API.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')).token : null;
    if (token) {
       config.headers.Authorization = `Bearer ${token}`;
       
       // Checking  users role
       
       const userRole = localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')).role : null;
       if (userRole) {

         //  Allowing  access to admin routes only if the user is an admin

         if (config.url.startsWith('/admin') && userRole !== 'admin') {
           throw new Error('Unauthorized');
         }
       }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const getUser = (userId)=> API.get(`/user/${userId}`)



export const updateUser = (id, formData)=>API.put(`/user/${id}`, formData)

export const getAllUser=()=> API.get('/user')

export const followUser =(id,data)=> API.put(`/user/${id}/follow`, data)

export const unFollowUser =(id,data)=> API.put(`/user/${id}/unfollow`, data)

export const getFollowedUsers = (userId) => API.get(`/user/${userId}/followedUsers`);

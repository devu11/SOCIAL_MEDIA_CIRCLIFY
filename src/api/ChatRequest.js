import axios from "axios";

const API = axios.create({baseURL: 'http://circlify.shop'})



export const userChats =(id)=>API.get(`/chat/${id}`)
import axios from 'axios';
const API = axios.create({baseURL: "https://circlify.shop/"})

export const getMessages =(chatId)=> API.get(`/message/${chatId}`)

export const addMessage =(data)=> API.post('/message/', data)
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3001" });

export const getTimelinePosts = (id) => API.get(`/post/${id}/timeline`);

export const likedPost = (id, userId) =>
  API.put(`post/${id}/like`, { userId: userId });

export const updatePost = (updatedPost) =>
  API.put(`/post/${updatedPost._id}`, updatedPost);
export const deletePost = (postId, userId) =>
  API.delete(`/post/${postId}`, { data: { userId } });
export const addComment = (postId, userId, comment) =>
  API.post(`/post/${postId}/comment`, { userId, comment });

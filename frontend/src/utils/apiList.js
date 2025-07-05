const API_BASE_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/";
const apiEndPoints = {
  AUTH_LOGIN: `${API_BASE_URL}api/users/login`,
  AUTH_REGISTER: `${API_BASE_URL}api/users/register`,
  GET_USER: `${API_BASE_URL}api/users/getUser`,
  EDIT_USER: `${API_BASE_URL}api/users/editUser`,
  POST_CREATE: `${API_BASE_URL}api/posts/createPost`,
  POSTS_GET: `${API_BASE_URL}api/posts`,
  GET_POST_DETAILS: `${API_BASE_URL}api/posts/getPostDetails`,
  LIKE_ACTION: `${API_BASE_URL}api/posts/like`,
  COMMENT_ACTION: `${API_BASE_URL}api/posts/comment`,
  DELETE_COMMENT: `${API_BASE_URL}api/posts/deleteComment`,
  DELETE_POST: `${API_BASE_URL}api/posts/deletePost`,
};
export default apiEndPoints;

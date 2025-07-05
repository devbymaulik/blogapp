//\server\routers\postRouter.js
const express = require("express");
const {
  createPost,
  getPosts,
  getPost,
  getCatPosts,
  getUserPosts,
  editPost,
  deletePost,
  toggleLike,
  addComment,
  deleteComment,
} = require("../controllers/postControlloer");
const { authMiddleware } = require("../middlewares/authMiddleware");
const postRouter = express.Router();
postRouter.post("/createPost", authMiddleware, createPost); //Auth
postRouter.get("/", getPosts);
postRouter.get("/getPostDetails/:id", getPost);
postRouter.get("/categories/:category", getCatPosts);
postRouter.get("/users/:id", authMiddleware, getUserPosts); //Auth
postRouter.put("/:id", authMiddleware, editPost); //Auth
postRouter.delete("/deletePost/:id", authMiddleware, deletePost); //Auth
postRouter.put("/like/:id", authMiddleware, toggleLike); //Auth
postRouter.post("/comment/:id", authMiddleware, addComment); //Auth
postRouter.delete(
  "/deleteComment/:postId/:commentId",
  authMiddleware,
  deleteComment
); //Auth
module.exports = { postRouter };

const express = require("express");
const {
  register,
  login,
  getUser,
  getAuthors,
  changeAvtar,
  editUser,
} = require("../controllers/userController");
const { userValidation } = require("../middlewares/userValidation");
const { authMiddleware } = require("../middlewares/authMiddleware");
const userRouter = express.Router();
userRouter.post("/register", userValidation, register);
userRouter.post("/login", login);
userRouter.get("/getUser/:id", getUser);
userRouter.get("/", getAuthors);
userRouter.patch("/editUser", authMiddleware, editUser);
module.exports = { userRouter };

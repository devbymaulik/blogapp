const { userModel } = require("../models/userModel");
const mongoose = require("mongoose"); // ✅ ADD THIS LINE
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");
require("dotenv").config();
const register = async (req, res) => {
  try {
    const { name, email, password, password2 } = req.body;
    if (!name || !email || !password) {
      return res.status(422).json({ error: "All Fields are Mandatory" });
    }

    const newEmail = email.toLowerCase();
    const isEmailExists = await userModel.findOne({ email: newEmail });
    if (isEmailExists) {
      return res.status(422).json({ error: "Email Already Exists" });
    }

    if (password != password2) {
      return res.status(422).json({ error: "Password do not match" });
    }

    const hashPassword = bcrypt.hashSync(password, 10);
    const newUser = await userModel.create({
      name,
      email: newEmail,
      password: hashPassword,
    });
    return res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    return res.status(422).json({ error: "User Registration Failed." });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({ error: "All Fields are Required" });
    }
    const newEmail = email.toLowerCase();
    const isuser = await userModel.findOne({ email: newEmail });
    // console.log(isuser);
    if (!isuser) {
      return res.status(422).json({ error: "Invalid credentials" });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, isuser.password);

    if (!isPasswordCorrect) {
      return res.status(422).json({ error: "Invalid credentials" });
    }
    const jwtkey = process.env.JWTKEY;
    const token = jwt.sign({ id: isuser._id, name: isuser.name }, jwtkey, {
      expiresIn: "1d",
    });
    return res.status(200).json({ token, id: isuser._id, name: isuser.name });
  } catch (error) {
    console.log(error);
    return res.status(422).json({ error: "User Login Failed." });
  }
};
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    // ✅ Step 1: Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    // ✅ Step 2: Try to find the user by ID
    const user = await userModel.findById(id).select("-password");

    // ✅ Step 3: If not found, return 404
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // ✅ Step 4: Return user data
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const editUser = async (req, res) => {
  try {
    const { name, email, currentPassword, newPassword } = req.body;

    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if email is changing and already exists
    if (email && email !== user.email) {
      const emailExists = await userModel.findOne({ email });
      if (emailExists && emailExists._id.toString() !== req.user.id) {
        return res.status(422).json({ error: "Email already exists" });
      }
    }

    // Handle password change only if newPassword is provided
    let hashedPassword = user.password;
    if (newPassword) {
      if (!currentPassword) {
        return res
          .status(422)
          .json({ error: "Current password is required to set new password" });
      }
      const isPasswordValid = bcrypt.compareSync(
        currentPassword,
        user.password
      );
      if (!isPasswordValid) {
        return res.status(422).json({ error: "Invalid current password" });
      }
      hashedPassword = bcrypt.hashSync(newPassword, 10);
    }

    // Handle avatar upload if present
    let newAvatar = user.avatar;
    if (req.files && req.files.avatar) {
      const { avatar } = req.files;

      if (avatar.size > 500000) {
        return res
          .status(422)
          .json({ error: "Avatar too large. Max size 500KB." });
      }

      // Remove old avatar if exists
      if (user.avatar) {
        const oldPath = path.join(__dirname, "..", "uploads", user.avatar);
        fs.unlink(oldPath, (err) => {
          if (err) console.warn("Old avatar delete error:", err);
        });
      }

      const fileExt = path.extname(avatar.name);
      const newFileName = `${uuid()}${fileExt}`;
      const uploadPath = path.join(__dirname, "..", "uploads", newFileName);
      await avatar.mv(uploadPath);
      newAvatar = newFileName;
    }

    // Build update object dynamically
    const updateData = {
      ...(name && { name }),
      ...(email && { email }),
      ...(newPassword && { password: hashedPassword }),
      ...(req.files?.avatar && { avatar: newAvatar }),
    };

    const updatedUser = await userModel
      .findByIdAndUpdate(req.user.id, updateData, { new: true })
      .select("-password");

    return res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    console.error("editUser error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const getAuthors = async (req, res) => {
  try {
    const author = await userModel.find().select("-password");
    if (!author) {
      return res.status(422).json({ error: "Author not found" });
    }
    return res.status(200).json(author);
  } catch (error) {
    console.log(error);
    return res.status(422).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  register,
  login,
  getUser,
  editUser,
  getAuthors,
};

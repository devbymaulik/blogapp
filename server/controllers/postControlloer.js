const { v4: uuid } = require("uuid");
const fs = require("fs");
const path = require("path");
const { postModel } = require("../models/postModel");
const { userModel } = require("../models/userModel");
const { error } = require("console");
const { insertFileintoFirbebase } = require("../firebase/insertFile");
const createPost = async (req, res) => {
  try {
    const { title, category, description } = req.body;
    if (!req.files) {
      return res.status(422).json({ error: "choose thumbnail" });
    }
    const { thumbnail } = req.files;
    if (!title || !category || !description || !thumbnail) {
      return res
        .status(422)
        .json({ error: "Fill in all fields and choose thumbnail" });
    }

    if (thumbnail.size > 2000000) {
      return res
        .status(422)
        .json({ error: "Thumbnail too big, file should be less than 2mb" });
    }
    let fileName = thumbnail.name;
    let splittedFilename = fileName.split(".");
    let newFileName =
      splittedFilename[0] +
      uuid() +
      "." +
      splittedFilename[splittedFilename.length - 1];
    const metadata = {
      contentType: thumbnail.mimetype,
    };
    const thumbnailUrl = await insertFileintoFirbebase(
      newFileName,
      req.files.thumbnail.data,
      metadata
    );
    if (!thumbnailUrl) {
      return res.status(422).json({ error: "Post coudn't be created." });
    }
    const newPost = await postModel.create({
      title,
      category,
      thumbnail: thumbnailUrl,
      creator: req.user.id,
      description,
    });
    //find user and increas post count by 1
    const currentUser = await userModel.findById(req.user.id);
    const userPostCount = currentUser.posts + 1;
    await userModel.findByIdAndUpdate(req.user.id, { posts: userPostCount });
    return res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
    return res.status(422).json({ error: "Internal Server Error" });
  }
};
const getPosts = async (req, res) => {
  try {
    const { creator } = req.query;
    const filter = creator ? { creator } : {};
    const posts = await postModel.find(filter).sort({ createdAt: -1 });
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(422).json({ error: "Internal Server Error" });
  }
};
const getPost = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await postModel
      .findById(postId)
      .populate("comments.user", "name avatar"); // ✅ Only populate commenter info

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    return res.status(422).json({ error: "Internal Server Error" });
  }
};
const getCatPosts = async (req, res) => {
  try {
    const category = req.params.category;
    const post = await postModel.find({ category }).sort({ updatedAt: -1 });
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    return res.status(422).json({ error: "Internal Server Error" });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await postModel.find({ creator: id }).sort({ updatedAt: -1 });
    if (!posts) {
      return res.status(404).json({ error: "Post not found" });
    }
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(422).json({ error: "Internal Server Error" });
  }
};

const editPost = async (req, res) => {
  try {
    let fileName;
    let newFileName;
    let updatedPost;
    const postId = req.params.id;
    const { title, category, description } = req.body;
    if (!title || !category || !description.length < 12) {
      return res.status(422).json({ error: "Fill in all fields" });
    }
    if (!req.files) {
      updatedPost = await postModel.findByIdAndUpdate(
        postId,
        { title, category, description },
        { new: true }
      );
    } else {
      //get old post from db
      const oldPost = await postModel.findById(postId);
      //Delete old thumbnail form upload
      fs.unlink(
        path.join(__dirname, "..", "uploads", oldPost.thumbnail, (error) => {
          if (error) {
            return res.status(422).json(error);
          }
        })
      );
      //Upload new thumbnail
      const { thumbnail } = req.files;
      if (thumbnail.size > 2000000) {
        return res
          .status(422)
          .json({ error: "Thumbnail too big, file should be less than 2mb" });
      }
      fileName = thumbnail.name;
      let splittedFilename = fileName.split(".");
      newFileName =
        splittedFilename[0] +
        uuid() +
        "." +
        splittedFilename[splittedFilename.length - 1];
      thumbnail.mv(
        path.join(__dirname, "..", "/uploads", newFileName),
        async (error) => {
          if (error) {
            return res.status(422).json({ error });
          }
          updatedPost = await postModel.findByIdAndUpdate(
            postId,
            { title, category, description, thumbnail: newFileName },
            { new: true }
          );
        }
      );
    }
    if (!updatedPost) {
      return res.status(422).json({ error: "Post coudln't be updated" });
    }
    return res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    return res.status(422).json({ error: "Internal Server Error" });
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    if (!postId) {
      return res.status(400).json({ error: "Post ID not provided" });
    }

    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (req.user.id !== post.creator.toString()) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const fileName = post.thumbnail;

    // Delete the image file
    fs.unlink(
      path.join(__dirname, "..", "uploads", fileName),
      async (error) => {
        if (error && error.code !== "ENOENT") {
          // ENOENT = file doesn't exist, which is not critical
          return res.status(500).json({ error: "Failed to delete thumbnail" });
        }

        // Delete the post
        await postModel.findByIdAndDelete(postId);

        // Reduce user's post count
        await userModel.findByIdAndUpdate(req.user.id, {
          $inc: { posts: -1 },
        });

        // ✅ Respond only once from inside the callback
        return res.status(200).json({ msg: "Post deleted successfully" });
      }
    );
  } catch (error) {
    console.error("Delete Post Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const toggleLike = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const post = await postModel.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    post.likes = post.likes.filter((id) => id !== null);
    const index = post.likes.findIndex(
      (id) => id && id.toString() === userId.toString()
    );
    if (index === -1) {
      post.likes.push(userId); // like
    } else {
      post.likes.splice(index, 1); // unlike
    }
    await post.save();
    return res.status(200).json(post.likes);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
// POST /api/posts/:id/commen
const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const userId = req.user.id;

    if (!text) {
      return res.status(400).json({ message: "Comment is required." });
    }

    const post = await postModel.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // 🔍 Check if the user already commented
    const existingCommentIndex = post.comments.findIndex(
      (comment) => comment.user.toString() === userId
    );

    if (existingCommentIndex !== -1) {
      // 🔁 Update existing comment
      post.comments[existingCommentIndex].text = text;
      post.comments[existingCommentIndex].updatedAt = new Date(); // optional
    } else {
      // ➕ Add new comment
      post.comments.push({ user: userId, text });
    }
    await post.save();
    // Populate user details in comment
    await post.populate("comments.user", "name avatar");
    return res.status(200).json(post.comments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
// DELETE /api/posts/:postId/comments/:commentId
const deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const userId = req.user.id;

    const post = await postModel.findById(postId);
    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });

    const commentIndex = post.comments.findIndex(
      (comment) => comment._id.toString() === commentId
    );

    if (commentIndex === -1)
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    // Only allow comment owner to delete
    if (post.comments[commentIndex].user.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this comment",
      });
    }
    post.comments.splice(commentIndex, 1); // ✅ remove comment
    await post.save();
    return res.status(200).json(post.comments);
  } catch (error) {
    console.error("Error deleting comment:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
module.exports = {
  createPost,
  getPost,
  getPosts,
  getCatPosts,
  getUserPosts,
  editPost,
  deletePost,
  toggleLike,
  addComment,
  deleteComment,
};

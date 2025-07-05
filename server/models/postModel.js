const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" }, // ✅ match model name
    text: { type: String, required: true },
  },
  { timestamps: true }
);

const postSchema = new mongoose.Schema(
  {
    title: String,
    category: String,
    description: String,
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "users" }, // ✅
    thumbnail: String,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }], // ✅
    comments: [commentSchema],
  },
  { timestamps: true }
);
const postModel = mongoose.model("posts", postSchema);
module.exports = { postModel }; // ✅ correct named export

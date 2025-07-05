import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { createPost } from "./redux/dispatcher";

export default function CreatePost() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  const POST_CATEGORIES = ["Agriculture", "Business", "Education"];

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const handleCreatePost = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("thumbnail", thumbnail);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    dispatch(createPost(formData));
  };

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="bg-white shadow rounded p-4 p-md-5">
          <h2 className="mb-4 text-center text-primary">Create New Post</h2>
          <form onSubmit={handleCreatePost}>
            {/* Title */}
            <div className="mb-3">
              <label htmlFor="title" className="form-label fw-semibold">
                Post Title
              </label>
              <input
                type="text"
                id="title"
                className="form-control"
                placeholder="Enter post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Category */}
            <div className="mb-3">
              <label htmlFor="category" className="form-label fw-semibold">
                Category
              </label>
              <select
                id="category"
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select a category</option>
                {POST_CATEGORIES.map((cat, i) => (
                  <option key={i} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className="mb-3">
              <label htmlFor="description" className="form-label fw-semibold">
                Post Content
              </label>
              <ReactQuill
                modules={modules}
                formats={formats}
                value={description}
                onChange={setDescription}
                className="bg-white"
              />
            </div>

            {/* Thumbnail */}
            <div className="mb-4">
              <label htmlFor="thumbnail" className="form-label fw-semibold">
                Thumbnail Image
              </label>
              <input
                type="file"
                id="thumbnail"
                className="form-control"
                accept=".png, .jpg, .jpeg"
                onChange={(e) => setThumbnail(e.target.files[0])}
              />
            </div>

            {/* Submit */}
            <div className="text-start">
              <button type="submit" className="btn btn-primary px-4">
                Publish Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import { useDispatch, useSelector } from "react-redux";
import {
  addCommentAction,
  getPostDetails,
  toggleLikeAction,
} from "./redux/dispatcher";
import { getUserAction } from "../../postAuthor/redux/dispatcher";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export default function PostDetails() {
  const dispatch = useDispatch();
  const userID = useSelector((state) => state.loginReducer.data?.id);
  const { id } = useParams();
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    if (id) dispatch(getPostDetails(id));
  }, [id]);

  const {
    data: post,
    error,
    loading,
  } = useSelector((state) => state.getPostDetailsReducer);

  useEffect(() => {
    if (post?.creator) dispatch(getUserAction(post.creator));
  }, [post?.creator]);
  const { data: author } = useSelector((state) => state.getUseReducer || {});
  const handleLike = () => {
    if (userID) {
      dispatch(toggleLikeAction(id, userID));
    } else {
      alert("Please login to like the post.");
    }
  };
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!userID) return alert("Please login to comment.");
    if (commentText.trim()) {
      dispatch(addCommentAction(id, commentText));
      setCommentText("");
    }
  };
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!post || loading)
    return <div className="text-center my-5">Loading post...</div>;
  const {
    title,
    description,
    thumbnail,
    createdAt,
    category,
    likes = [],
    comments = [],
  } = post;

  console.log(comments);
  const userLiked = likes?.includes(userID);
  const avatarUrl = author?.avatar
    ? `${backendUrl}uploads/${author.avatar}`
    : "https://firebasestorage.googleapis.com/v0/b/blogproject-f9e9c.appspot.com/o/user-dummy1a79f4f5-fbdd-4518-a32f-4f85f5b08da8.png?alt=media";

  const thumbnailUrl = thumbnail?.includes("http")
    ? thumbnail
    : `${backendUrl}/uploads/${thumbnail}`;

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <h1 className="fw-bold mb-3">{title}</h1>

          <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap">
            <div className="d-flex align-items-center">
              <img
                src={avatarUrl}
                alt={author?.name || "Author"}
                className="rounded-circle me-3"
                style={{ width: 50, height: 50, objectFit: "cover" }}
              />
              <div>
                <h6 className="mb-0">{author?.name || "Unknown Author"}</h6>
                <small className="text-muted">
                  {createdAt && !isNaN(new Date(createdAt)) ? (
                    <ReactTimeAgo date={new Date(createdAt)} locale="en-US" />
                  ) : (
                    "Date not available"
                  )}
                </small>
              </div>
            </div>
            <span className="badge bg-primary-subtle text-primary fw-medium px-3 py-2 border border-primary">
              {category}
            </span>
          </div>

          <div className="mb-4">
            <img
              src={thumbnailUrl}
              alt="Post Thumbnail"
              className="img-fluid rounded shadow-sm"
              style={{ maxHeight: 350, width: "100%", objectFit: "cover" }}
            />
          </div>

          <div
            className="post-content lead mb-4"
            dangerouslySetInnerHTML={{ __html: description }}
          />

          {/* Like Button */}

          <button
            className={`btn ${
              userLiked ? "btn-primary" : "btn-outline-primary"
            } mb-3`}
            onClick={handleLike}
          >
            👍 {likes.length} {likes.length === 1 ? "Like" : "Likes"}
          </button>

          {/* Comments Section */}
          <div className="card p-3">
            <h5 className="mb-3">Comments ({comments.length})</h5>
            {comments.map((c, i) => {
              const isOwnComment = c.user?._id === userID;

              return (
                <div
                  key={i}
                  className={`mb-3 d-flex ${
                    isOwnComment
                      ? "bg-light border-start border-primary ps-2"
                      : ""
                  }`}
                >
                  {/* Avatar */}
                  <img
                    src={
                      c.user?.avatar
                        ? `${backendUrl}uploads/${c.user.avatar}`
                        : "https://firebasestorage.googleapis.com/v0/b/blogproject-f9e9c.appspot.com/o/user-dummy1a79f4f5-fbdd-4518-a32f-4f85f5b08da8.png?alt=media"
                    }
                    alt="Avatar"
                    className="rounded-circle me-2"
                    style={{
                      width: "40px",
                      height: "40px",
                      objectFit: "cover",
                    }}
                  />

                  {/* Comment content */}
                  <div>
                    <div className="d-flex align-items-center">
                      <strong className="me-2">
                        {c.user?.name}{" "}
                        {isOwnComment && (
                          <span className="badge bg-primary ms-1">You</span>
                        )}
                      </strong>
                      <small className="text-muted">
                        {c.createdAt && !isNaN(new Date(c.createdAt)) ? (
                          <ReactTimeAgo
                            date={new Date(c.createdAt)}
                            locale="en-US"
                          />
                        ) : (
                          "Date not available"
                        )}
                      </small>
                    </div>
                    <p className="mb-0 small">{c.text}</p>
                  </div>
                </div>
              );
            })}

            <form onSubmit={handleCommentSubmit} className="mt-3">
              <textarea
                className="form-control mb-2"
                rows="2"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                Post Comment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

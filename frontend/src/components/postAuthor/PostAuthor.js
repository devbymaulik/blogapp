import React, { useEffect } from "react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import ReactTimeAgo from "react-time-ago";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserAction } from "./redux/dispatcher";

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/";

// Load locales once globally
TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

export default function PostAuthor({ createdAt, authorId }) {
  const dispatch = useDispatch();
  const { data = {} } = useSelector((state) => state.getUseReducer);

  const author = data[authorId];

  useEffect(() => {
    if (authorId && !author) {
      dispatch(getUserAction(authorId)); // Fetch only if not already in cache
    }
  }, [authorId, author, dispatch]);

  const avatarUrl = author?.avatar
    ? author.avatar.startsWith("http")
      ? author.avatar
      : `${BACKEND_URL}uploads/${author.avatar}`
    : "https://firebasestorage.googleapis.com/v0/b/blogproject-f9e9c.appspot.com/o/user-dummy1a79f4f5-fbdd-4518-a32f-4f85f5b08da8.png?alt=media";

  return (
    <Link
      to={`/posts/users/${authorId}`}
      className="d-flex align-items-center text-decoration-none text-dark gap-2"
      style={{ fontSize: "0.875rem" }}
    >
      <img
        src={avatarUrl}
        alt={author?.name || "Author"}
        className="rounded-circle"
        style={{ width: 36, height: 36, objectFit: "cover" }}
      />
      <div>
        <div className="fw-semibold">By: {author?.name || "Unknown"}</div>
        {createdAt && (
          <small className="text-muted">
            <ReactTimeAgo date={new Date(createdAt)} locale="en-US" />
          </small>
        )}
      </div>
    </Link>
  );
}

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FcLike } from "react-icons/fc";
import { LuMessageSquareMore } from "react-icons/lu";
import PostAuthor from "../postAuthor/PostAuthor";

export default function PostItem({ post }) {
  const shortTitle =
    post?.title.length > 60 ? post.title.substring(0, 60) + "..." : post?.title;

  const shortDescription =
    post?.description.length > 150
      ? post.description.substring(0, 150) + "..."
      : post?.description;

  const likeCount = post?.likes?.length || 0;
  const commentCount = post?.comments?.length || 0;

  return (
    <motion.article
      className="card h-100 d-flex flex-column border-0 post-item"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      viewport={{ once: true }}
    >
      <Link
        to={`/post/getPostDetails/${post._id}`}
        className="text-decoration-none text-dark d-flex flex-column h-100"
      >
        {post?.thumbnail && (
          <img
            src={post.thumbnail}
            alt={post.title}
            className="card-img-top rounded-top"
            style={{ objectFit: "cover", height: "200px" }}
          />
        )}

        {/* Body */}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title fw-bold mb-2">{shortTitle}</h5>

          {/* Category badge */}
          <span className="badge bg-light text-primary border border-primary text-capitalize mb-2 px-3 py-1">
            {post?.category}
          </span>

          {/* Short description */}
          <p
            className="card-text text-muted small mb-3 flex-grow-1"
            dangerouslySetInnerHTML={{ __html: shortDescription }}
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          ></p>

          {/* Author & Metrics Footer */}
          <div className="mt-auto d-flex justify-content-between align-items-center pt-2 border-top ">
            <PostAuthor createdAt={post?.createdAt} authorId={post?.creator} />
            <div className="d-flex align-items-center gap-3">
              <small
                className="d-flex align-items-center text-muted"
                title="Likes"
              >
                <FcLike size={20} className="me-1" />
                {likeCount}
              </small>
              <small
                className="d-flex align-items-center text-muted"
                title="Comments"
              >
                <LuMessageSquareMore size={20} className="me-1" />
                {commentCount}
              </small>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

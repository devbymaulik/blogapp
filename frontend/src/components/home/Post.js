import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "./redux/dispatcher";

export default function Post() {
  const dispatch = useDispatch();
  const [showMyPosts, setShowMyPosts] = useState(false);

  const posts = useSelector((state) => state.postsReducer.posts);
  const userID = useSelector((state) => state.loginReducer.data?.id);

  useEffect(() => {
    if (showMyPosts && userID) {
      dispatch(getPosts(userID));
    } else {
      dispatch(getPosts());
    }
  }, [showMyPosts, userID, dispatch]);

  return (
    <>
      {/* Filter Buttons */}
      {userID ? (
        <div className="text-center mb-5">
          <div
            className="btn-group btn-group-lg shadow rounded-pill"
            role="group"
            aria-label="Post Filters"
          >
            <button
              className={`btn px-4 ${
                !showMyPosts ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setShowMyPosts(false)}
            >
              <i className="fas fa-globe me-2"></i> All Posts
            </button>
            <button
              className={`btn px-4 ${
                showMyPosts ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setShowMyPosts(true)}
              disabled={!userID}
            >
              <i className="fas fa-user me-2"></i> My Posts
            </button>
          </div>
        </div>
      ) : (
        ""
      )}

      {/* Posts Display */}
      {posts.length > 0 ? (
        <div className="row g-4">
          {posts.map((post) => (
            <div className="col-sm-6 col-md-4 col-lg-3" key={post?._id}>
              <PostItem post={post} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <div
            className="card bg-white border-0 shadow-sm mx-auto p-5"
            style={{ maxWidth: "500px" }}
          >
            <div className="d-flex flex-column align-items-center">
              <i className="fas fa-box-open fa-3x text-secondary mb-3"></i>
              <h4 className="fw-semibold text-muted">No Posts Found</h4>
              <p className="text-muted mb-3">
                Try switching filters or start your first post now!
              </p>
              <button className="btn btn-primary px-4">
                <i className="fas fa-plus me-2"></i> Create Post
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

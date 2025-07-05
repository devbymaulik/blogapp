import React from "react";
import Post from "./Post";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary text-white text-center py-3 shadow-sm">
        <div className="container">
          <h1 className="display-5 fw-bold">Welcome to Our Blog</h1>
          <p className="lead mt-3">
            Discover the latest insights, stories, and resources from our team.
          </p>
        </div>
      </section>

      {/* Latest Posts */}
      <main className="bg-light py-5">
        <div className="container">
          <Post />
        </div>
      </main>
    </>
  );
}

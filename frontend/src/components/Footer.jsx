import React from "react";
export default function Footer() {
  return (
    <footer className="contaier-fluid bg-dark text-light py-3">
      <div className="container text-center">
        <p className="mb-0 fw-semibold">
          © {new Date().getFullYear()} My Blog. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

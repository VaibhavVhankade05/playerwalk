import React from "react";
import "../styles/footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="bottom-tabs">

      {/* HOME */}
      <div className="tab active">
        <Link to="/" className="footer-link">
          <i className="fa-solid fa-house"></i>
          <span>Home</span>
        </Link>
      </div>

      {/* EXPLORE */}
      <div className="tab">
        <Link to="/explore" className="footer-link">
          <i className="fa-solid fa-magnifying-glass"></i>
          <span>Explore</span>
        </Link>
      </div>

      {/* GOALS */}
      <div className="tab">
        <Link to="/goals" className="footer-link">
          <i className="fa-solid fa-bullseye"></i>
          <span>Goals</span>
        </Link>
      </div>

      {/* READ */}
      <div className="tab">
        <Link to="/read" className="footer-link">
          <i className="fa-solid fa-book-open"></i>
          <span>Read</span>
        </Link>
      </div>

      {/* PROFILE */}
      <div className="tab">
        <Link to="/profile" className="footer-link">
          <i className="fa-solid fa-user"></i>
          <span>Profile</span>
        </Link>
      </div>

    </div>
  );
}

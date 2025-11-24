import React from "react";
import "../styles/footer.css";

export default function Footer() {
  return (
    <div className="bottom-tabs">
      <div className="tab active">
        <i className="fa-solid fa-house"></i>
        <span>Home</span>
      </div>

      <div className="tab">
        <i className="fa-solid fa-magnifying-glass"></i>
        <span>Explore</span>
      </div>

      <div className="tab">
        <i className="fa-solid fa-bullseye"></i>
        <span>Goals</span>
      </div>

      <div className="tab">
        <i className="fa-solid fa-book-open"></i>
        <span>Read</span>
      </div>

      <div className="tab">
        <i className="fa-solid fa-user"></i>
        <span>Profile</span>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/read.css";

export default function Read() {
  const [tab, setTab] = useState("all");
  const [showFooter, setShowFooter] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Updated: Added liked, saved state inside posts
  const [posts, setPosts] = useState([
    {
      id: 1,
      tag: "Match Updates",
      title: "India Dominates in First Test Against Australia",
      desc: "Historic victory at the MCG as Indian cricket team showcases exceptional performance...",
      author: "Cricket Times",
      time: "3 min",
      date: "2 hours ago",
      likes: 1240,
      comments: 8,
      shares: 6,
      liked: false,
      saved: false,
      img: "/images/blog1.jpg",
      type: "news",
    },
    {
      id: 2,
      tag: "Coaching Tips",
      title: "Mastering the Art of Spin Bowling",
      desc: "A comprehensive guide on developing spin bowling techniques, pitch conditions, and mindset...",
      author: "Coach Ravi Kumar",
      time: "12 min",
      date: "3 days ago",
      likes: 2100,
      comments: 12,
      shares: 9,
      liked: false,
      saved: false,
      img: "/images/blog2.jpg",
      type: "blogs",
    },
    {
      id: 3,
      tag: "IPL News",
      title: "IPL 2025 Auction: Record-Breaking Bids",
      desc: "The latest IPL auction sees unprecedented bidding wars as franchises compete for young talent...",
      author: "Sports Weekly",
      time: "5 min",
      date: "5 hours ago",
      likes: 5600,
      comments: 15,
      shares: 14,
      liked: false,
      saved: false,
      img: "/images/blog3.jpg",
      type: "news",
    },
    {
      id: 4,
      tag: "Health & Fitness",
      title: "Nutrition Guide for Cricket Players",
      desc: "What you eat can make or break your performance. Expert nutritionists share ideal diet tips...",
      author: "Dr. Meera Patel",
      time: "7 min",
      date: "4 days ago",
      likes: 1800,
      comments: 10,
      shares: 7,
      liked: false,
      saved: false,
      img: "/images/blog4.jpg",
      type: "blogs",
    },
  ]);

  const filteredPosts =
    tab === "all" ? posts : posts.filter((p) => p.type === tab);

  // Hide footer on scroll
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      if (current > lastScrollY && current > 100) setShowFooter(false);
      else setShowFooter(true);
      setLastScrollY(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // 👉 LIKE / UNLIKE
  const toggleLike = (id) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  };

  // 👉 SAVE / UNSAVE
  const toggleSave = (id) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, saved: !p.saved } : p))
    );
  };

  // 👉 SHARE POST
  const sharePost = (id) => {
    navigator.clipboard.writeText(`https://yourapp.com/blog/${id}`);
    alert("🔗 Post link copied!");
  };

  return (
    <>
      <Navbar />

      <div className="container-fluid px-5">
        {/* Header */}
        <div className="read-header">
          <div className="title-section">
            <i className="fa-solid fa-book-open icon"></i>
            <h2>Read</h2>
          </div>
          <button className="write-article-btn">
            <i className="fa-solid fa-plus"></i> Write Article
          </button>
        </div>

        {/* Tabs */}
        <div className="read-tabs">
          <div
            className={`tab-btn ${tab === "all" ? "active" : ""}`}
            onClick={() => setTab("all")}
          >
            All
          </div>
          <div
            className={`tab-btn ${tab === "news" ? "active" : ""}`}
            onClick={() => setTab("news")}
          >
            News
          </div>
          <div
            className={`tab-btn ${tab === "blogs" ? "active" : ""}`}
            onClick={() => setTab("blogs")}
          >
            Blogs
          </div>
        </div>

        {/* Blog Grid */}
        <div className="blog-grid">
          {filteredPosts.map((p) => (
            <div key={p.id} className="blog-card">
              <div className="tag">{p.tag}</div>
              <img src={p.img} alt="" className="blog-img" />

              <div className="blog-content">
                <h3 className="blog-title">{p.title}</h3>
                <p className="blog-desc">{p.desc}</p>

                {/* Author row */}
                <div className="blog-author">
                  <i className="fa-solid fa-user"></i>
                  <span>{p.author}</span>
                  <span className="dot">•</span>
                  <i className="fa-regular fa-clock"></i>
                  <span>{p.time}</span>
                  <span className="dot">•</span>
                  <span className="date">{p.date}</span>
                </div>

                {/* Footer with actions */}
                <div className="blog-footer">

                  {/* LEFT: Like + Save */}
                  <div className="left-actions">

                    {/* LIKE */}
                    <div
                      className={`action-btn like ${p.liked ? "active" : ""}`}
                      onClick={() => toggleLike(p.id)}
                    >
                      <i
                        className={`fa-${p.liked ? "solid" : "regular"} fa-heart`}
                      ></i>
                      <span>{p.likes}</span>
                    </div>

                    {/* SAVE */}
                    <div
                      className={`action-btn save ${p.saved ? "active" : ""}`}
                      onClick={() => toggleSave(p.id)}
                    >
                      <i className="fa-solid fa-bookmark"></i>
                    </div>
                  </div>

                  {/* SHARE */}
                  <div className="action-btn share" onClick={() => sharePost(p.id)}>
                    <i className="fa-solid fa-share-nodes"></i>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={showFooter ? "footer-visible" : "footer-hidden"}>
        <Footer />
      </div>
    </>
  );
}

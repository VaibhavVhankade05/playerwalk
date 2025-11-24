import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/home/Sidebar";
import Post from "../components/home/Post";
import Footer from "../components/Footer";
import "../styles/home.css"

export default function Home() {
  const [showFooter, setShowFooter] = useState(true);
  const lastScroll = useRef(0);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const current = window.scrollY;

      // ignore small scroll movements
      if (Math.abs(current - lastScroll.current) > 10) {
        if (current > lastScroll.current) {
          // scrolling DOWN → show footer
          setShowFooter(true);
        } else {
          // scrolling UP → hide footer
          setShowFooter(false);
        }
        lastScroll.current = current;
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <Navbar />

      <div className="container mt-5" style={{marginBottom:"100px"}}>
        <div className="row justify-content-center">

          <div className="col-4 sidebar-scroll">
            <Sidebar />
          </div>

          <div className="col-8 post-scroll">
            <Post />
          </div>

        </div>
      </div>

      <div className={showFooter ? "footer-visible" : "footer-hidden"}>
        <Footer />
      </div>
    </div>
  );
}

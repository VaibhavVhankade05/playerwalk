import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/live.css";

export default function Live() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemHeight, setItemHeight] = useState(40);
  const marqueeRef = useRef(null);
  const intervalRef = useRef(null);
  const navigate = useNavigate();

  // Sample vertical data
  const verticalData = [
    "🏏 IND vs AUS • 1st Test • Day 3: IND 245/6 (89.4) • Kohli 72*, Jadeja 44*",
    "🏏 BPL 2024 • Comilla vs Fortune • Comilla 187/4 (18.2) • Need 45 in 10 balls",
    "🏏 SA20 • Joburg vs Paarl • Joburg 156/8 (20) • Paarl 89/3 (11.2)",
    "🏏 Ranji Trophy • Mumbai vs Karnataka • Mumbai 324 • Karnataka 187/5 (62.1)",
    "🏏 U19 WC • IND vs AUS • IND 254/8 (50) • AUS 127/4 (25.2)",
    "🏏 WPL 2024 • MI Women vs RCB Women • Starts in 2 hours"
  ];

  const cricketData = [
    "Test • IND 245/6 vs AUS 352 • Kohli 72*",
    "T20 • ENG 178/4 vs SA 166/8 • Curran 3/28",
    "ODI • PAK 245/9 vs NZ 210/7 • Afridi 4/45",
    "BPL • Comilla 187/4 vs Fortune 145/9",
    "SA20 • Joburg 156/8 vs Paarl 89/3",
    "Ranji • Mumbai 324 vs Karnataka 187/5"
  ];

  // Handle responsive item height
  useEffect(() => {
    const updateItemHeight = () => {
      if (window.innerWidth <= 576) {
        setItemHeight(34);
      } else {
        setItemHeight(40);
      }
    };

    updateItemHeight();
    window.addEventListener("resize", updateItemHeight);

    return () => {
      window.removeEventListener("resize", updateItemHeight);
    };
  }, []);

  

  const startAutoRotation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === verticalData.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
  };
  
  // Auto rotation with cleanup
  useEffect(() => {
    startAutoRotation();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    startAutoRotation(); // Reset timer when user interacts
  };

  function handleView() {
    navigate("/view");
  }

  useEffect(() => {
    if (marqueeRef.current) {
      marqueeRef.current.style.animationPlayState = isPlaying
        ? "running"
        : "paused";
    }
  }, [isPlaying]);

  // Enhanced marquee with better performance
  const handleMarqueeInteraction = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      {/* Horizontal Marquee Section */}
      <div className="marquee-container">
        <h6 className="marquee-title">
          <span className="blink-dot"></span> Live
          <sub className="sport-sub">(Cricket)</sub>
        </h6>

        <div className="marquee-wrapper">
          <div 
            className="marquee-text" 
            ref={marqueeRef}
            aria-live={isPlaying ? "off" : "polite"}
          >
            {[...cricketData, ...cricketData].map((item, index) => (
              <span key={index} className="highlight">
                {item} •
              </span>
            ))}
          </div>
        </div>

        <button
          className="marquee-btn"
          onClick={handleMarqueeInteraction}
          aria-label={isPlaying ? "Pause ticker" : "Play ticker"}
        >
          {isPlaying ? (
            <i className="fa-solid fa-pause"></i>
          ) : (
            <i className="fa-solid fa-play"></i>
          )}
        </button>
      </div>

      {/* Vertical Ticker Section */}
      <div className="vertical-ticker-container">
        <div className="container-fluid">
          <div className="row align-items-center">
            {/* Live Title - Left */}
            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-12 d-flex align-items-center justify-content-xl-center justify-content-lg-start justify-content-md-start justify-content-sm-center mb-sm-2 mb-md-0">
              <h6 className="marquee-title m-0">
                <span className="blink-dot"></span> Live
                <sub className="sport-sub">(Cricket)</sub>
              </h6>
            </div>

            {/* Vertical Ticker - Center */}
            <div className="col-xl-8 col-lg-6 col-md-6 col-sm-12 position-relative">
              <div className="ticker-box">
                <div
                  className="ticker-content"
                  style={{
                    transform: `translateY(-${currentIndex * itemHeight}px)`,
                  }}
                  aria-live="polite"
                >
                  {verticalData.map((item, i) => (
                    <div 
                      className={`ticker-item ${i === currentIndex ? 'active' : ''}`} 
                      key={i}
                      aria-hidden={i !== currentIndex}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Dot Indicators */}
              <div className="ticker-dots">
                {verticalData.map((_, i) => (
                  <button
                    key={i}
                    className={`dot ${i === currentIndex ? "active" : ""}`}
                    onClick={() => goToSlide(i)}
                    aria-label={`Go to match ${i + 1}`}
                    aria-current={i === currentIndex}
                  ></button>
                ))}
              </div>
            </div>

            {/* View More Button - Right */}
            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-12 d-flex align-items-center justify-content-xl-center justify-content-lg-end justify-content-md-end justify-content-sm-center mt-sm-2 mt-md-0">
              <button className="view-btn" onClick={handleView}>
                View More <i className="fa-solid fa-angles-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
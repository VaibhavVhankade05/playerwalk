import React, { useEffect, useRef, useState, useCallback } from "react";
import "../styles/navbar.css";
import { useNavigate } from "react-router-dom";

// Constants for better maintainability
const CRICKET_DATA = [
  "Test • IND 102/3 vs AUS 352/7",
  "T20 • ENG 178/4 vs SA 166/8",
  "ODI • PAK 245/9 vs NZ 210/7",
];

const VERTICAL_DATA = [
  "Mumbai Indians 176/4 • CSK 158/6",
  "India 294/5 • Australia 178",
  "Pakistan 245/9 • New Zealand 210/7",
  "BREAKING: Virat Kohli fastest to 13,000 ODI runs",
  "Rohit Sharma hits 150+ in chase vs England",
  "Bumrah takes 5 wickets in a stunning spell",
  "Hardik Pandya ruled out due to injury",
  "Pant returns with 82* off 45 balls",
  "Gill rises to No.1 in ICC ODI rankings",
  "England 188/3 • South Africa 176/8",
];

const SCREEN_BREAKPOINTS = {
  MOBILE: 576,
  TABLET: 768,
  DESKTOP: 992,
  LARGE_DESKTOP: 1200
};

const ITEM_HEIGHTS = {
  DESKTOP: 40,
  MOBILE: 34
};

export default function Navbar() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemHeight, setItemHeight] = useState(ITEM_HEIGHTS.DESKTOP);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= SCREEN_BREAKPOINTS.MOBILE);
  
  const marqueeRef = useRef(null);
  const intervalRef = useRef(null);
  const navigate = useNavigate();

  // Handle responsive layout
  const handleResize = useCallback(() => {
    const mobile = window.innerWidth <= SCREEN_BREAKPOINTS.MOBILE;
    setIsMobile(mobile);
    setItemHeight(mobile ? ITEM_HEIGHTS.MOBILE : ITEM_HEIGHTS.DESKTOP);
  }, []);

  useEffect(() => {
    handleResize(); // Initial call
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  // Marquee animation control
  useEffect(() => {
    if (marqueeRef.current) {
      marqueeRef.current.style.animationPlayState = isPlaying ? "running" : "paused";
    }
  }, [isPlaying]);

  // Auto rotation with cleanup
  const startAutoRotation = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      setCurrentIndex(prevIndex => 
        prevIndex === VERTICAL_DATA.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
  }, []);

  useEffect(() => {
    startAutoRotation();
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [startAutoRotation]);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index);
    startAutoRotation();
  }, [startAutoRotation]);

  const handleView = () => {
    navigate("/view");
  };

  const togglePlayPause = () => {
    setIsPlaying(prev => !prev);
  };

  // Memoized event handlers for better performance
  const handleDotClick = useCallback((index) => () => {
    goToSlide(index);
  }, [goToSlide]);

  const handleKeyPress = useCallback((event, index) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      goToSlide(index);
    }
  }, [goToSlide]);

  return (
    <>
      <nav className="navbar px-3" role="navigation" aria-label="Main navigation">
        <div className="navbar-content">
          <div className="logo ms-2" role="banner">PlayerWalk</div>
          {!isMobile && (
            <sub className="live-wrapper">
              <div className="live-tag ms-2 p-2" aria-label="Cricket section">Cricket</div>
            </sub>
          )}
        </div>
      </nav>

      {/* Horizontal Marquee Section */}
      <div className="marquee-container px-sm-1 py-1 col-sm-12">
        <h6 className="marquee-title ms-5">
          <span className="blink-dot" aria-hidden="true"></span> 
          Live
          <sub className="sport-sub">(Cricket)</sub>
        </h6>

        <div className="marquee-wrapper">
          <div 
            className="marquee-text" 
            ref={marqueeRef}
            aria-live={isPlaying ? "off" : "polite"}
          >
            {[...CRICKET_DATA, ...CRICKET_DATA].map((item, index) => (
              <span key={index} className="highlight">
                {item} •
              </span>
            ))}
          </div>
        </div>

        <button 
          className="marquee-btn me-5" 
          onClick={togglePlayPause}
          aria-label={isPlaying ? "Pause ticker" : "Play ticker"}
        >
          {isPlaying ? (
            <i className="fa-solid fa-pause" aria-hidden="true"></i>
          ) : (
            <i className="fa-solid fa-play" aria-hidden="true"></i>
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
                <span className="blink-dot" aria-hidden="true"></span> 
                Live
                <sub className="sport-sub">(Cricket)</sub>
              </h6>
            </div>

            {/* Vertical Ticker - Center */}
            <div className="col-xl-8 col-lg-6 col-md-6 col-sm-12 position-relative">
              <div 
                className="ticker-box"
                aria-live="polite"
                aria-atomic="true"
                aria-label={`Live cricket update: ${VERTICAL_DATA[currentIndex]}`}
              >
                <div
                  className="ticker-content"
                  style={{ transform: `translateY(-${currentIndex * itemHeight}px)` }}
                >
                  {VERTICAL_DATA.map((item, index) => (
                    <div 
                      className="ticker-item" 
                      key={index}
                      aria-hidden={index !== currentIndex}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Dot Indicators */}
              <div className="ticker-dots" role="tablist" aria-label="Cricket news slides">
                {VERTICAL_DATA.map((_, index) => (
                  <button
                    key={index}
                    className={`dot ${index === currentIndex ? "active" : ""}`}
                    onClick={handleDotClick(index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    role="tab"
                    aria-selected={index === currentIndex}
                    aria-label={`Go to slide ${index + 1}`}
                    tabIndex={0}
                  />
                ))}
              </div>
            </div>

            {/* View More Button - Right */}
            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-12 d-flex align-items-center justify-content-xl-center justify-content-lg-end justify-content-md-end justify-content-sm-center mt-sm-2 mt-md-0">
              <button 
                className="view-btn" 
                onClick={handleView}
                aria-label="View more cricket news and updates"
              >
                View More <i className="fa-solid fa-angles-right" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
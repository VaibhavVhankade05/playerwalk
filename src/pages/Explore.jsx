import React, { useState, useEffect } from "react";
import "../styles/explore.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Explore() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [showFooter, setShowFooter] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [savedItems, setSavedItems] = useState([]);
  const [sortOption, setSortOption] = useState("newest");

  const opportunities = [
    {
      id: 1,
      title: "IPL Academy Trials",
      organization: "Mumbai Indians Academy",
      type: "tryout",
      location: "Mumbai, Maharashtra",
      deadline: "2025-11-15",
      registration: "₹500 registration",
      prize: "",
      verified: true,
      requirements: [
        "Age: 16–21 years",
        "Must have district/state level experience",
        "Valid ID proof required",
      ],
      applicants: 1247,
      featured: true,
      dateAdded: "2025-10-01",
    },
    {
      id: 2,
      title: "BCCI State Championship",
      organization: "BCCI",
      type: "tournament",
      location: "Multiple Cities",
      deadline: "2025-11-20",
      registration: "",
      prize: "₹2,00,000",
      verified: true,
      requirements: [
        "Age: Under 19",
        "District team selection required",
        "Medical fitness certificate",
      ],
      applicants: 892,
      featured: false,
      dateAdded: "2025-10-05",
    },
    {
      id: 3,
      title: "Sports University Scholarship",
      organization: "LNIPE University",
      type: "scholarship",
      location: "Gwalior, MP",
      deadline: "2025-12-10",
      registration: "Free",
      prize: "Full tuition + ₹15,000/month",
      verified: true,
      requirements: [
        "Age: 17-25 years",
        "State level participation",
        "Academic scores above 70%",
      ],
      applicants: 567,
      featured: true,
      dateAdded: "2025-09-28",
    },
    {
      id: 4,
      title: "Advanced Bowling Academy",
      organization: "MRF Pace Foundation",
      type: "academy",
      location: "Chennai, Tamil Nadu",
      deadline: "2025-11-30",
      registration: "₹2,000/month",
      prize: "",
      verified: true,
      requirements: [
        "Age: 15-28 years",
        "Basic bowling skills required",
        "Fitness test mandatory",
      ],
      applicants: 334,
      featured: false,
      dateAdded: "2025-10-10",
    },
    {
      id: 5,
      title: "Women's T20 Challenge",
      organization: "BCCI Women's Wing",
      type: "tournament",
      location: "Delhi & Mumbai",
      deadline: "2025-12-05",
      registration: "Free",
      prize: "₹5,00,000",
      verified: true,
      requirements: [
        "Age: 16-35 years",
        "Previous club experience",
        "Valid BCCI registration",
      ],
      applicants: 278,
      featured: true,
      dateAdded: "2025-10-03",
    },
    {
      id: 6,
      title: "U-19 National Camp Selection",
      organization: "National Cricket Academy",
      type: "tryout",
      location: "Bangalore, Karnataka",
      deadline: "2025-11-25",
      registration: "₹300 registration",
      prize: "",
      verified: true,
      requirements: [
        "Age: Under 19",
        "District/State level certificates",
        "Parent consent required",
      ],
      applicants: 1563,
      featured: true,
      dateAdded: "2025-09-25",
    },
  ];

  const filterCounts = {
    all: opportunities.length,
    tryout: opportunities.filter((o) => o.type === "tryout").length,
    tournament: opportunities.filter((o) => o.type === "tournament").length,
    scholarship: opportunities.filter((o) => o.type === "scholarship").length,
    academy: opportunities.filter((o) => o.type === "academy").length,
  };

  // Enhanced filtering and sorting
  const getSortedAndFilteredOpportunities = () => {
    let filtered = activeFilter === "all" 
      ? opportunities 
      : opportunities.filter((o) => o.type === activeFilter);

    // Apply sorting
    switch(sortOption) {
      case "deadline":
        return filtered.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
      case "popular":
        return filtered.sort((a, b) => b.applicants - a.applicants);
      case "newest":
      default:
        return filtered.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    }
  };

  const filteredOpportunities = getSortedAndFilteredOpportunities();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedOpportunities")) || [];
    setSavedItems(saved);
  }, []);

  const toggleSaveItem = (item) => {
    const exists = savedItems.some((s) => s.id === item.id);
    let updated;

    if (exists) {
      updated = savedItems.filter((s) => s.id !== item.id);
    } else {
      updated = [...savedItems, item];
    }

    setSavedItems(updated);
    localStorage.setItem("savedOpportunities", JSON.stringify(updated));
  };

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

  const getTypeColor = (type) => {
    const colors = {
      tryout: "#ff6b35",
      tournament: "#00b4d8",
      scholarship: "#38b000",
      academy: "#9d4edd",
    };
    return colors[type] || "#666";
  };

  const getTypeIcon = (type) => {
    const icons = {
      tryout: "fa-solid fa-trophy",
      tournament: "fa-solid fa-flag",
      scholarship: "fa-solid fa-graduation-cap",
      academy: "fa-solid fa-building",
    };
    return icons[type] || "fa-solid fa-circle";
  };

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const getDaysLeft = (deadline) => {
    const diff = new Date(deadline) - new Date();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const getDeadlineUrgency = (daysLeft) => {
    if (daysLeft <= 0) return "expired";
    if (daysLeft <= 3) return "urgent";
    if (daysLeft <= 7) return "warning";
    return "normal";
  };

  return (
    <>
      <div className="explore-page">
        <Navbar />

        <div className="container-fluid pt-4 px-5 mb-5">

          <div className="explore-hero mb-5">
            <div>
              <h4>Cricket Opportunities</h4>
              <h6>Find tournaments, trials, academies and scholarships</h6>

              <div className="d-flex gap-4 mt-3">
                <div className="text-center">
                  <span className="stat-number">150+</span>
                  <p className="stat-label">Active Players</p>
                </div>
                <div className="text-center">
                  <span className="stat-number">25+</span>
                  <p className="stat-label">Partners</p>
                </div>
                <div className="text-center">
                  <span className="stat-number">₹50L+</span>
                  <p className="stat-label">Prize Money</p>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-5 px-5">
            <div className="col-md-4 mb-3">
              <div className="stat-card d-flex align-items-center">
                <div className="stat-icon me-4">
                  <i className="fa-solid fa-bullseye"></i>
                </div>
                <div>
                  <h5>{opportunities.length}</h5>
                  <p className="fw-bold">Active Opportunities</p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="stat-card d-flex align-items-center">
                <div className="stat-icon me-4">
                  <i className="fa-solid fa-clock"></i>
                </div>
                <div>
                  <h5>{opportunities.filter((o) => getDaysLeft(o.deadline) <= 7 && getDaysLeft(o.deadline) > 0).length}</h5>
                  <p className="fw-bold">Closing This Week</p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="stat-card d-flex align-items-center">
                <div className="stat-icon me-4">
                  <i class="fa-solid fa-shield"></i>
                </div>
                <div>
                  <h5>{opportunities.filter((o) => o.verified).length}</h5>
                  <p className="fw-bold">Verified Partners</p>
                </div>
              </div>
            </div>
          </div>

          <div className="filter-section mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2>Browse Opportunities</h2>

              <select 
                className="form-select w-auto bg-dark text-white border-secondary"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="deadline">Deadline</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>

            <div className="d-flex flex-wrap gap-2">
              {Object.entries(filterCounts).map(([filter, count]) => (
                <button
                  key={filter}
                  className={`filter-tab ${activeFilter === filter ? "active" : ""}`}
                  onClick={() => setActiveFilter(filter)}
                  style={
                    activeFilter === filter
                      ? { 
                          backgroundColor: getTypeColor(filter !== "all" ? filter : "tryout"),
                          borderColor: getTypeColor(filter !== "all" ? filter : "tryout")
                        }
                      : {}
                  }
                >
                  <i className={getTypeIcon(filter !== "all" ? filter : "tryout")}></i>
                  {filter.charAt(0).toUpperCase() + filter.slice(1)} ({count})
                </button>
              ))}
            </div>
          </div>

          <div className="row g-4">
            {filteredOpportunities.map((op) => {
              const isSaved = savedItems.some((item) => item.id === op.id);
              const daysLeft = getDaysLeft(op.deadline);
              const urgency = getDeadlineUrgency(daysLeft);

              return (
                <div key={op.id} className="col-md-6 col-lg-4">
                  <div className={`opportunity-card ${op.featured ? "featured" : ""}`}>

                    <button
                      className="save-btn-top"
                      onClick={() => toggleSaveItem(op)}
                    >
                      <i
                        className={
                          isSaved
                            ? "fa-solid fa-bookmark saved-icon"
                            : "fa-regular fa-bookmark"
                        }
                      ></i>
                    </button>

                    <div className="card-header d-flex justify-content-between align-items-start card-header-fixed">
                      <div className="flex-grow-1 pe-2">
                        <h5>{op.title}</h5>

                        <div className="d-flex flex-wrap gap-2 mt-1">
                          <span
                            className="custom-badge"
                            style={{
                              color: getTypeColor(op.type),
                              border: `1px solid ${getTypeColor(op.type)}`,
                            }}
                          >
                            <i className={getTypeIcon(op.type)}></i>
                            {op.type}
                          </span>

                          {op.verified && (
                            <span className="custom-badge verified-border">
                              <i className="fa-solid fa-check"></i> Verified
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="applicant-count me-4">
                        <i className="fa-solid fa-users"></i> {op.applicants.toLocaleString()}
                      </div>
                    </div>

                    <p className="org-name">{op.organization}</p>

                    <div className="card-info">
                      <div className="info-item">
                        <i className="fa-solid fa-location-dot"></i>
                        <span>{op.location}</span>
                      </div>
                      <div className="info-item">
                        <i className="fa-solid fa-clock"></i>
                        <span>Deadline: {formatDate(op.deadline)}</span>
                      </div>
                    </div>

                    <div className={`deadline-warning deadline-${urgency}`}>
                      <i className="fa-solid fa-hourglass-half"></i>
                      {daysLeft <= 0 
                        ? "Deadline expired" 
                        : `${daysLeft} day${daysLeft !== 1 ? 's' : ''} left to apply`
                      }
                    </div>

                    <div className="price-section">
                      {op.registration && <span className="registration">{op.registration}</span>}
                      {op.prize && <span className="prize-money">{op.prize}</span>}
                    </div>

                    <div className="requirements">
                      <h4>Requirements</h4>
                      <ul>
                        {op.requirements.map((r, index) => (
                          <li key={index}>{r}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="action-buttons-row">
                      <button 
                        className="apply-btn" 
                        disabled={daysLeft <= 0}
                      >
                        <i className="fa-solid fa-paper-plane"></i> 
                        {daysLeft <= 0 ? 'Expired' : 'Apply Now'}
                      </button>

                      <button className="learn-btn">
                        <i className="fa-solid fa-circle-info"></i> Learn More
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={showFooter ? "footer-visible" : "footer-hidden"}>
          <Footer />
        </div>
      </div>
    </>
  );
}
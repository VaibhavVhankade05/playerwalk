import React, { useEffect, useState } from "react";
import "../styles/goal.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Goal() {
  // State management for various UI components
  const [showModal, setShowModal] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [showFooter, setShowFooter] = useState(true);
  const [openUnit, setOpenUnit] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState("active");
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [rewardOpen, setRewardOpen] = useState(false);
  const [rewardType, setRewardType] = useState("Select Reward");
  const [badgeTab, setBadgeTab] = useState("all");

  // Form data state for goal creation
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    unit: "",
    targetValue: "",
    deadline: "",
  });

  // Modal control functions
  const openModal = () => setShowModal(true);

  const closeModal = () => {
    setShowModal(false);
    setOpenCategory(false);
    setOpenUnit(false);
    // Reset form data
    setFormData({
      title: "",
      description: "",
      category: "",
      unit: "",
      targetValue: "",
      deadline: "",
    });
  };

  // Handle input changes in form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle dropdown selections
  const handleSelect = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "category") setOpenCategory(false);
    if (name === "unit") setOpenUnit(false);
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Goal created:", formData);
    alert("Goal created successfully!");
    closeModal();
  };

  // Form validation
  const isFormValid = () => {
    return (
      formData.title.trim() &&
      formData.description.trim() &&
      formData.category &&
      formData.unit &&
      formData.targetValue &&
      formData.deadline
    );
  };

  // Scroll effect for footer visibility
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

  // Sample goals data
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "Daily Practice Sessions",
      category: "batting",
      current: 12,
      target: 30,
      deadline: "12/31/2025",
      badgeColor: "blue",
    },
    {
      id: 2,
      title: "Bowling Accuracy",
      category: "bowling",
      current: 6,
      target: 10,
      deadline: "-",
      badgeColor: "red",
    },
    {
      id: 3,
      title: "Fitness Goals",
      category: "fitness",
      current: 25,
      target: 60,
      deadline: "11/30/2025",
      badgeColor: "orange",
    },
    {
      id: 4,
      title: "Fielding Drills",
      category: "fielding",
      current: 10,
      target: 50,
      deadline: "10/20/2025",
      badgeColor: "warning",
    },
  ]);

  // Function to increase goal progress
  const increaseProgress = (id, value) => {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === id
          ? {
              ...goal,
              current:
                goal.current + value >= goal.target
                  ? goal.target
                  : goal.current + value,
            }
          : goal
      )
    );
  };

  // Reward selection handler
  const selectReward = (value) => {
    setRewardType(value);
    setRewardOpen(false);
  };

  // Badges data
  const allBadges = [
    { id: 1, unlocked: true, type: "legendary" },
    { id: 2, unlocked: false, type: "legendary" },
    { id: 3, unlocked: true, type: "epic" },
    { id: 4, unlocked: false, type: "epic" },
    { id: 5, unlocked: true, type: "rare" },
    { id: 6, unlocked: false, type: "rare" },
    { id: 7, unlocked: false, type: "legendary" },
    { id: 8, unlocked: false, type: "epic" },
    { id: 9, unlocked: false, type: "rare" },
  ];

  // Filter badges based on selected tab
  const filteredBadges =
    badgeTab === "all"
      ? allBadges
      : badgeTab === "unlocked"
      ? allBadges.filter((b) => b.unlocked)
      : allBadges.filter((b) => !b.unlocked);

  return (
    // Main page container
    <div className="goal-page">
      {/* Blur background when modal is open */}
      <div className={showModal ? "page-blurred" : ""}>
        {/* Navigation component */}
        <Navbar />

        {/* Main content area */}
        <div className="pb-5 px-5">
          {/* Page header section */}
          <div className="container-fluid px-5 py-4">
            {/* Header with title and add button */}
            <div className="d-flex justify-content-between align-items-center">
              {/* Title section */}
              <div>
                <h5>My Cricket Goals</h5>
                <p className="sub">
                  Track progress and earn achievement badges
                </p>
              </div>

              {/* Add goal button */}
              <button className="btn-add me-5" onClick={openModal}>
                <i className="fa-solid fa-plus me-2"></i>Add Goal
              </button>
            </div>

            {/* Main goal creation modal */}
            {showModal && (
              <div className="modal-overlay" onClick={closeModal}>
                <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                  <form onSubmit={handleSubmit}>
                    {/* Modal header */}
                    <div className="modal-header">
                      <h2>Create New Goal</h2>
                      <button
                        type="button"
                        className="close-btn"
                        onClick={closeModal}
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>

                    <p className="modal-sub">
                      Set a new goal to track your progress and improve your
                      cricket skills.
                    </p>

                    {/* Goal title input */}
                    <div className="field-group">
                      <label>Goal Title</label>
                      <input
                        type="text"
                        name="title"
                        className="input-field"
                        placeholder="e.g., Daily Practice Sessions"
                        value={formData.title}
                        onChange={handleInputChange}
                      />
                    </div>

                    {/* Goal description input */}
                    <div className="field-group">
                      <label>Description</label>
                      <textarea
                        name="description"
                        className="textarea-field"
                        placeholder="Describe the goal in detail"
                        value={formData.description}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>

                    {/* Category and unit selection */}
                    <div className="row-2">
                      <div className="field-group">
                        <label>Category</label>
                        <div
                          className="custom-select"
                          onClick={() => setOpenCategory(!openCategory)}
                        >
                          <div className="selected-value">
                            {formData.category
                              ? formData.category.charAt(0).toUpperCase() +
                                formData.category.slice(1)
                              : "Select category"}
                          </div>
                          {openCategory && (
                            <div className="dropdown">
                              {[
                                "batting",
                                "bowling",
                                "fielding",
                                "fitness",
                                "mental",
                                "team",
                              ].map((item) => (
                                <div
                                  key={item}
                                  className="dropdown-item"
                                  onClick={() => handleSelect("category", item)}
                                >
                                  {item.charAt(0).toUpperCase() + item.slice(1)}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Unit selection */}
                      <div className="field-group">
                        <label>Unit</label>
                        <div
                          className="custom-select"
                          onClick={() => setOpenUnit(!openUnit)}
                        >
                          <div className="selected-value">
                            {formData.unit
                              ? formData.unit.charAt(0).toUpperCase() +
                                formData.unit.slice(1)
                              : "Select unit"}
                          </div>

                          {openUnit && (
                            <div className="dropdown">
                              {[
                                "days",
                                "sessions",
                                "runs",
                                "wickets",
                                "catches",
                                "overs",
                                "matches",
                              ].map((item) => (
                                <div
                                  key={item}
                                  className="dropdown-item"
                                  onClick={() => handleSelect("unit", item)}
                                >
                                  {item.charAt(0).toUpperCase() + item.slice(1)}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Target value and deadline */}
                    <div className="row-2">
                      <div className="field-group">
                        <label>Target Value</label>
                        <input
                          type="number"
                          name="targetValue"
                          className="input-field"
                          placeholder="e.g., 30"
                          value={formData.targetValue}
                          onChange={handleInputChange}
                          min="1"
                        />
                      </div>

                      <div className="field-group">
                        <label>Deadline</label>
                        <input
                          type="date"
                          name="deadline"
                          className="input-field"
                          value={formData.deadline}
                          onChange={handleInputChange}
                          min={new Date().toISOString().split("T")[0]}
                        />
                      </div>
                    </div>

                    {/* Submit button */}
                    <button
                      type="submit"
                      className="create-btn"
                      disabled={!isFormValid()}
                    >
                      Create Goal
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>

          {/* Stats cards section */}
          <div className="container-fluid px-5">
            {/* Top statistics cards */}
            <div className="top-stats px-5">
              {/* Streak stat card */}
              <div className="stat-card orange">
                <div className="stat-icon">
                  <i className="fa-solid fa-fire"></i>
                </div>
                <div className="stat-body">
                  <div className="stat-label">Total Streak</div>
                  <div className="stat-value">11 days</div>
                </div>
              </div>

              {/* Completed goals stat card */}
              <div className="stat-card green">
                <div className="stat-icon green">
                  <i className="fa-solid fa-check-circle"></i>
                </div>
                <div className="stat-body">
                  <div className="stat-label">Completed</div>
                  <div className="stat-value">0 / 3</div>
                </div>
              </div>

              {/* Active goals stat card */}
              <div className="stat-card blue">
                <div className="stat-icon blue">
                  <i className="fa-solid fa-bullseye"></i>
                </div>
                <div className="stat-body">
                  <div className="stat-label">Active Goals</div>
                  <div className="stat-value">3</div>
                </div>
              </div>
            </div>

            {/* Goals list section */}
            <div className="row">
              {goals.map((goal) => {
                const progressPercent = (goal.current / goal.target) * 100;
                const isCompleted = goal.current >= goal.target;

                return (
                  // Individual goal card
                  <div className="col-12 col-md-6 mb-3" key={goal.id}>
                    <div className="goal-item">
                      {/* Goal header section */}
                      <div className="goal-item-header">
                        <div>
                          <div className="goal-title">
                            {goal.title}{" "}
                            <span
                              className={`badge ${
                                isCompleted ? "green" : goal.badgeColor
                              }`}
                            >
                              {isCompleted ? "Completed" : goal.category}
                            </span>
                          </div>
                          <div className="goal-sub">
                            {goal.category === "batting" &&
                              "Complete 60 minutes of net practice daily"}
                            {goal.category === "bowling" &&
                              "Hit the stumps 8 out of 10 times"}
                            {goal.category === "fitness" &&
                              "Run 5km every morning to build stamina"}
                            {goal.category === "fielding" &&
                              "Complete 50 high-catch drills daily"}
                          </div>
                        </div>
                        <div className="goal-meta">
                          <div className="mini-badge">{goal.current} days</div>
                        </div>
                      </div>

                      {/* Progress bar section */}
                      <div className="progress-line">
                        <div className="progress-left">
                          Progress: {goal.current} / {goal.target}{" "}
                          {goal.category === "bowling" ? "sessions" : "days"}
                        </div>

                        <div className="progress-bar">
                          <div
                            className="progress"
                            style={{ width: `${progressPercent}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Goal footer with controls */}
                      <div className="progress-footer">
                        <div className="deadline">
                          Deadline: {goal.deadline}
                        </div>
                        <div className="days-controls">
                          {!isCompleted && (
                            <button
                              className="chip btn"
                              onClick={() => increaseProgress(goal.id, 1)}
                            >
                              +1 days
                            </button>
                          )}

                          {/* Extra button for fitness goals */}
                          {goal.category === "fitness" && !isCompleted && (
                            <button
                              className="chip btn"
                              onClick={() => increaseProgress(goal.id, 5)}
                            >
                              +5 days
                            </button>
                          )}
                        </div>
                      </div>

                      {/* View badges link */}
                      <div className="view-badges">
                        View Your Achievement Badges
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Streak section */}
            <div className="row">
              <div className="streak-section">
                <div className="streak-card">
                  <div className="streak-icon">
                    <i className="fa-solid fa-fire"></i>
                  </div>
                  <div className="streak-value">15 Days</div>
                  <div className="streak-label">Current Streak</div>
                  <div className="streak-progress">
                    <div className="streak-info-row">
                      <div className="streak-note">Next Milestone: 30 Days</div>
                      <span className="badge purple">Premium Badge</span>
                    </div>

                    <div className="progress-mini">
                      <div className="progress" style={{ width: "25%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Power-ups shop section */}
            <div className="row">
              <div className="powerups-section">
                {/* Power-ups header */}
                <div className="powerups-header">
                  <div className="section-title">
                    <i className="fa-solid fa-wand-magic-sparkles me-2"></i>
                    Power-ups Shop
                  </div>

                  <div className="coins-display">
                    <i className="fa-solid fa-coins"></i> 450 Coins
                  </div>
                </div>

                {/* Power-ups grid */}
                <div className="row g-3">
                  {/* Streak Freeze power-up */}
                  <div className="col-12 col-md-6">
                    <div className="powerup-card">
                      <div className="icon-wrapper blue">
                        <i className="fa-solid fa-shield-halved"></i>
                      </div>

                      <div className="info">
                        <div className="title">Streak Freeze</div>
                        <div className="desc">
                          Protect your streak for 1 day if you miss check-in
                        </div>

                        <div className="price">
                          <i className="fa-solid fa-coins"></i> 100
                        </div>
                      </div>

                      <div className="owned-badge">2 owned</div>
                      <i className="fa-solid fa-lock lock-icon"></i>
                    </div>
                  </div>

                  {/* XP Boost power-up */}
                  <div className="col-12 col-md-6">
                    <div className="powerup-card">
                      <div className="icon-wrapper warning">
                        <i className="fa-solid fa-bolt"></i>
                      </div>

                      <div className="info">
                        <div className="title">2x XP Boost</div>
                        <div className="desc">Earn double XP for 24 hours</div>

                        <div className="price">
                          <i className="fa-solid fa-coins"></i> 150
                        </div>
                      </div>

                      <div className="owned-badge">1 owned</div>
                      <i className="fa-solid fa-lock lock-icon"></i>
                    </div>
                  </div>

                  {/* Lucky Spin power-up */}
                  <div className="col-12 col-md-6">
                    <div className="powerup-card">
                      <div className="icon-wrapper purple">
                        <i className="fa-solid fa-star"></i>
                      </div>

                      <div className="info">
                        <div className="title">Lucky Spin</div>
                        <div className="desc">
                          Spin the wheel for random rewards
                        </div>

                        <div className="price">
                          <i className="fa-solid fa-coins"></i> 50
                        </div>
                      </div>

                      <div className="owned-badge">3 owned</div>
                      <i className="fa-solid fa-lock lock-icon"></i>
                    </div>
                  </div>

                  {/* Streak Recovery power-up */}
                  <div className="col-12 col-md-6">
                    <div className="powerup-card">
                      <div className="icon-wrapper orange">
                        <i className="fa-solid fa-rotate-left"></i>
                      </div>

                      <div className="info">
                        <div className="title">Streak Recovery</div>
                        <div className="desc">
                          Recover your broken streak (up to 7 days)
                        </div>

                        <div className="price">
                          <i className="fa-solid fa-coins"></i> 200
                        </div>
                      </div>

                      <div className="owned-badge">0 owned</div>
                      <i className="fa-solid fa-lock lock-icon"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Milestones section */}
            <div className="row mt-5">
              <div className="milestones-section p-5">
                <div className="section-title">
                  <i className="fa-solid fa-trophy me-2"></i> Streak Milestones
                </div>

                {/* Milestones list */}
                <div className="milestone-list">
                  {/* 7 Days milestone */}
                  <div className="milestone-card done">
                    <div className="left">
                      <div className="milestone-icon done">
                        <i className="fa-solid fa-check"></i>
                      </div>

                      <div>
                        <div className="milestone-title">7 Days</div>
                        <div className="milestone-reward">1 Streak Freeze</div>
                      </div>
                    </div>

                    <span className="status-badge green">Claimed</span>
                  </div>

                  {/* 15 Days milestone */}
                  <div className="milestone-card done">
                    <div className="left">
                      <div className="milestone-icon done">
                        <i className="fa-solid fa-check"></i>
                      </div>

                      <div>
                        <div className="milestone-title">15 Days</div>
                        <div className="milestone-reward">2x XP Boost</div>
                      </div>
                    </div>

                    <span className="status-badge green">Claimed</span>
                  </div>

                  {/* 30 Days milestone */}
                  <div className="milestone-card">
                    <div className="left">
                      <div className="milestone-icon">
                        <i className="fa-solid fa-bullseye"></i>
                      </div>

                      <div>
                        <div className="milestone-title">30 Days</div>
                        <div className="milestone-reward">Premium Badge</div>
                      </div>
                    </div>

                    <span className="status-badge gray">15 days</span>
                  </div>

                  {/* 60 Days milestone */}
                  <div className="milestone-card">
                    <div className="left">
                      <div className="milestone-icon">
                        <i className="fa-solid fa-bullseye"></i>
                      </div>

                      <div>
                        <div className="milestone-title">60 Days</div>
                        <div className="milestone-reward">3 Lucky Spins</div>
                      </div>
                    </div>

                    <span className="status-badge gray">45 days</span>
                  </div>

                  {/* 100 Days milestone */}
                  <div className="milestone-card">
                    <div className="left">
                      <div className="milestone-icon">
                        <i className="fa-solid fa-bullseye"></i>
                      </div>

                      <div>
                        <div className="milestone-title">100 Days</div>
                        <div className="milestone-reward">Legendary Badge</div>
                      </div>
                    </div>

                    <span className="status-badge gray">85 days</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pro tip section */}
            <div className="row">
              <div className="pro-tip">
                <div className="tip-left">
                  <div className="tip-icon">
                    <i className="fa-solid fa-shield"></i>
                  </div>

                  <div className="tip-text">
                    <div className="tip-title">Pro Tip</div>
                    <div className="tip-desc">
                      Use a Streak Freeze before going on vacation or during
                      busy days to protect your progress!
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social challenges section */}
            <div className="row mt-2">
              <div className="social-challenges p-4">
                {/* Challenges header */}
                <div className="sc-header">
                  <div>
                    <div className="sc-title">Social Challenges</div>
                    <div className="sc-sub">Compete & Collaborate</div>
                  </div>

                  <button className="sc-new-btn">
                    <i className="fa-solid fa-plus"></i> New Challenge
                  </button>
                </div>

                {/* Challenges tabs */}
                <div className="sc-tabs">
                  <div
                    className={`tab ${activeTab === "active" ? "active" : ""}`}
                    onClick={() => setActiveTab("active")}
                  >
                    Active (3)
                  </div>

                  <div
                    className={`tab ${
                      activeTab === "completed" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("completed")}
                  >
                    Completed
                  </div>

                  <div
                    className={`tab ${
                      activeTab === "suggested" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("suggested")}
                  >
                    Suggested
                  </div>
                </div>

                {/* Active challenges tab content */}
                {activeTab === "active" && (
                  <>
                    {/* Batting Average Showdown challenge */}
                    <div className="challenge-card">
                      <div className="challenge-header">
                        <div className="challenge-icon orange">
                          <i className="fa-solid fa-fire"></i>
                        </div>

                        <div className="challenge-info">
                          <div className="challenge-name">
                            Batting Average Showdown
                          </div>
                          <div className="challenge-sub">
                            Who can maintain the highest average this week?
                          </div>
                        </div>

                        <div className="challenge-time">⏱ 3 days</div>
                      </div>

                      <div className="challenge-progress">
                        <div className="player-line">
                          <div className="player-badge">Yo</div>
                          <div className="player-name">You</div>
                          <div className="bar-wrap">
                            <div
                              className="bar-fill"
                              style={{ width: "78%" }}
                            ></div>
                          </div>
                          <div className="player-score">45</div>
                        </div>

                        <div className="player-line">
                          <div className="player-badge">Ra</div>
                          <div className="player-name">Rahul K.</div>
                          <div className="bar-wrap">
                            <div
                              className="bar-fill"
                              style={{ width: "63%" }}
                            ></div>
                          </div>
                          <div className="player-score">38</div>
                        </div>
                      </div>

                      <div className="challenge-footer">
                        <div className="reward">
                          <i className="fa-solid fa-award"></i> Winner Badge +
                          500 Coins
                        </div>
                        <button className="share-btn">
                          <i className="fa-solid fa-share"></i> Share
                        </button>
                      </div>
                    </div>

                    {/* Team Streak challenge */}
                    <div className="challenge-card">
                      <div className="challenge-header">
                        <div className="challenge-icon blue">
                          <i className="fa-solid fa-users"></i>
                        </div>

                        <div className="challenge-info">
                          <div className="challenge-name">
                            Team 100-Day Streak
                          </div>
                          <div className="challenge-sub">
                            Help your team reach 100 combined days
                          </div>
                        </div>

                        <div className="challenge-time">⏱ 10 days</div>
                      </div>

                      <div className="challenge-progress">
                        <div className="player-line">
                          <div className="player-badge">Yo</div>
                          <div className="player-name">You</div>
                          <div className="bar-wrap">
                            <div
                              className="bar-fill"
                              style={{ width: "20%" }}
                            ></div>
                          </div>
                          <div className="player-score">15</div>
                        </div>

                        <div className="player-line">
                          <div className="player-badge">Pr</div>
                          <div className="player-name">Priya S.</div>
                          <div className="bar-wrap">
                            <div
                              className="bar-fill"
                              style={{ width: "30%" }}
                            ></div>
                          </div>
                          <div className="player-score">22</div>
                        </div>

                        <div className="player-line">
                          <div className="player-badge">Vk</div>
                          <div className="player-name">Vikas M.</div>
                          <div className="bar-wrap">
                            <div
                              className="bar-fill"
                              style={{ width: "24%" }}
                            ></div>
                          </div>
                          <div className="player-score">18</div>
                        </div>

                        <div className="player-line">
                          <div className="player-badge">An</div>
                          <div className="player-name">Anjali R.</div>
                          <div className="bar-wrap">
                            <div
                              className="bar-fill"
                              style={{ width: "38%" }}
                            ></div>
                          </div>
                          <div className="player-score">28</div>
                        </div>
                      </div>

                      <div className="challenge-footer">
                        <div className="reward">
                          <i className="fa-solid fa-award"></i> Team Badge +
                          1000 Coins each
                        </div>
                        <button className="share-btn">
                          <i className="fa-solid fa-share"></i> Share
                        </button>
                      </div>
                    </div>

                    {/* Beat Your Best challenge */}
                    <div className="challenge-card">
                      <div className="challenge-header">
                        <div className="challenge-icon purple">
                          <i className="fa-solid fa-bolt"></i>
                        </div>

                        <div className="challenge-info">
                          <div className="challenge-name">Beat Your Best</div>
                          <div className="challenge-sub">
                            Score more than your best this month (89 runs)
                          </div>
                        </div>

                        <div className="challenge-time">⏱ 5 days</div>
                      </div>

                      <div className="challenge-progress">
                        <div className="player-line">
                          <div className="player-badge">Cu</div>
                          <div className="player-name">Current Best</div>
                          <div className="bar-wrap">
                            <div
                              className="bar-fill"
                              style={{ width: "90%" }}
                            ></div>
                          </div>
                          <div className="player-score">89</div>
                        </div>

                        <div className="player-line">
                          <div className="player-badge">Th</div>
                          <div className="player-name">This Week</div>
                          <div className="bar-wrap">
                            <div
                              className="bar-fill"
                              style={{ width: "67%" }}
                            ></div>
                          </div>
                          <div className="player-score">67</div>
                        </div>
                      </div>

                      <div className="challenge-footer">
                        <div className="reward">
                          <i className="fa-solid fa-award"></i> Personal Best
                          Badge
                        </div>
                        <button className="share-btn">
                          <i className="fa-solid fa-share"></i> Share
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {/* Completed challenges tab content */}
                {activeTab === "completed" && (
                  <div className="challenge-card completed-card">
                    <div className="challenge-header">
                      <div className="challenge-icon green">
                        <i className="fa-solid fa-trophy"></i>
                      </div>

                      <div className="challenge-info">
                        <div className="challenge-name">
                          Fastest Century Challenge
                          <span className="status-badge done">Won</span>
                        </div>
                        <div className="challenge-sub">
                          Who scores 100 runs in fewer balls?
                        </div>
                      </div>
                    </div>

                    <div className="challenge-progress no-bars">
                      <div className="player-line">
                        <div className="player-badge">Yo</div>
                        <div className="player-name">You</div>
                        <div className="player-score green">52 balls</div>
                      </div>

                      <div className="player-line">
                        <div className="player-badge">Ka</div>
                        <div className="player-name">Karan M.</div>
                        <div className="player-score muted">61 balls</div>
                      </div>
                    </div>

                    <div className="challenge-footer">
                      <div className="reward green">
                        <i className="fa-solid fa-award"></i> Earned: Champion
                        Badge
                      </div>
                    </div>
                  </div>
                )}

                {/* Suggested challenges tab content */}
                {activeTab === "suggested" && (
                  <div className="suggested-list">
                    {/* Weekly Wickets Race challenge */}
                    <div className="suggested-card">
                      <div className="card-top">
                        <div className="title">Weekly Wickets Race</div>
                        <div className="players-count">2 players</div>
                      </div>

                      <div className="subtitle">Most wickets in 7 days</div>

                      <div className="reward-line">
                        <i className="fa-solid fa-coins"></i> 300 Coins
                      </div>

                      <div className="card-bottom">
                        <button className="start-btn">
                          <i className="fa-solid fa-bolt"></i> Start Challenge
                        </button>
                      </div>
                    </div>

                    {/* Consistency Challenge */}
                    <div className="suggested-card">
                      <div className="card-top">
                        <div className="title">Consistency Challenge</div>
                        <div className="players-count">1 player</div>
                      </div>

                      <div className="subtitle">
                        Score 20+ runs in 5 matches
                      </div>

                      <div className="reward-line">
                        <i className="fa-solid fa-bolt"></i> Streak Freeze
                      </div>

                      <div className="card-bottom">
                        <button className="start-btn">
                          <i className="fa-solid fa-bolt"></i> Start Challenge
                        </button>
                      </div>
                    </div>

                    {/* Create Custom Challenge card */}
                    <div className="custom-card">
                      <div className="custom-title">
                        <i className="fa-solid fa-fire"></i> Create Custom
                        Challenge
                      </div>
                      <div className="custom-sub">
                        Challenge friends with your own rules and rewards
                      </div>

                      <button
                        className="custom-btn"
                        onClick={() => setShowCustomModal(true)}
                      >
                        Create Custom
                      </button>
                    </div>

                    {/* Custom challenge modal */}
                    {showCustomModal && (
                      <div
                        className="modal-overlay"
                        onClick={() => setShowCustomModal(false)}
                      >
                        <div
                          className="custom-modal"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {/* Modal header */}
                          <div className="modal-header">
                            <div className="modal-title">
                              <i className="fa-solid fa-fire"></i> Create Custom
                              Challenge
                            </div>
                            <button
                              className="modal-close"
                              onClick={() => setShowCustomModal(false)}
                            >
                              <i className="fa-solid fa-xmark"></i>
                            </button>
                          </div>

                          {/* Modal form content */}
                          <div className="modal-content">
                            <label>Challenge Name</label>
                            <input
                              type="text"
                              placeholder="Enter challenge title"
                            />

                            <label>Description</label>
                            <textarea placeholder="Describe your challenge"></textarea>

                            <label>Reward Type</label>

                            <div className="custom-dropdown">
                              <div
                                className="dropdown-selected"
                                onClick={() => setRewardOpen(!rewardOpen)}
                              >
                                {rewardType}
                                <i className="fa-solid fa-chevron-down"></i>
                              </div>

                              {rewardOpen && (
                                <div className="dropdown-list">
                                  <div
                                    className="dropdown-item"
                                    onClick={() => selectReward("Coins")}
                                  >
                                    Coins
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    onClick={() =>
                                      selectReward("Streak Freeze")
                                    }
                                  >
                                    Streak Freeze
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    onClick={() =>
                                      selectReward("Premium Badge")
                                    }
                                  >
                                    Premium Badge
                                  </div>
                                </div>
                              )}
                            </div>

                            <label>Reward Value</label>
                            <input type="number" placeholder="Enter value" />

                            <label>Players</label>
                            <input
                              type="number"
                              placeholder="Number of players"
                            />
                          </div>

                          <button className="modal-create-btn">
                            <i className="fa-solid fa-check fw-bold"></i> Create
                            Challenge
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Badge collection section */}
            <div className="row">
              <div className="badge-collection">
                {/* Badge collection header */}
                <div className="bc-header">
                  <div>
                    <div className="bc-title">Badge Collection</div>
                    <div className="bc-sub">2/9 unlocked</div>
                  </div>
                  <div className="bc-progress">
                    <div
                      className="progress-fill"
                      style={{ width: "22%" }}
                    ></div>
                  </div>
                  <div className="bc-percent">22% Complete</div>
                </div>

                {/* Badge filter tabs */}
                <div className="badge-tabs">
                  <div
                    className={`badge-tab ${
                      badgeTab === "all" ? "active" : ""
                    }`}
                    onClick={() => setBadgeTab("all")}
                  >
                    All
                  </div>

                  <div
                    className={`badge-tab ${
                      badgeTab === "unlocked" ? "active" : ""
                    }`}
                    onClick={() => setBadgeTab("unlocked")}
                  >
                    Unlocked
                  </div>

                  <div
                    className={`badge-tab ${
                      badgeTab === "locked" ? "active" : ""
                    }`}
                    onClick={() => setBadgeTab("locked")}
                  >
                    Locked
                  </div>
                </div>

                {/* Limited time banner */}
                <div className="limited-banner">
                  <i className="fa-solid fa-bolt"></i> Limited Time!
                  <div className="banner-sub">
                    IPL 2025 badges available for 26 days only. Don't miss out!
                  </div>
                </div>

                {/* Badges grid */}
                <div className="badges-grid">
                  {filteredBadges.map((b, index) => {
                    return (
                      <div
                        key={index}
                        className={`badge-card ${b.type} ${
                          b.unlocked ? "highlight" : "locked-badge"
                        }`}
                      >
                        {/* Badge icon */}
                        <div className="badge-icon">
                          {b.type === "legendary" && (
                            <i className="fa-solid fa-crown"></i>
                          )}
                          {b.type === "epic" && (
                            <i className="fa-solid fa-fire"></i>
                          )}
                          {b.type === "rare" && (
                            <i className="fa-solid fa-star"></i>
                          )}
                        </div>

                        {/* Badge name */}
                        <div className="badge-name">
                          {b.type === "legendary" && "Legendary Badge"}
                          {b.type === "epic" && "Epic Badge"}
                          {b.type === "rare" && "Rare Badge"}
                        </div>

                        {/* Badge tags */}
                        <div className="badge-tags">
                          <span className={b.type}>{b.type.toUpperCase()}</span>
                          {!b.unlocked && (
                            <span className="limited">Locked</span>
                          )}
                        </div>

                        {/* Progress bar */}
                        <div className="badge-bar">
                          <div
                            className="fill"
                            style={{ width: b.unlocked ? "60%" : "0%" }}
                          ></div>
                        </div>

                        {/* Player stats */}
                        <div className="badge-players">
                          {b.unlocked ? "Unlocked • Top 5%" : "0% of players"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer with scroll behavior */}
      <div className={showFooter ? "footer-visible" : "footer-hidden"}>
        <Footer />
      </div>
    </div>
  );
}

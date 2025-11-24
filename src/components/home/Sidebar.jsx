import React, { useEffect, useState, useCallback, useMemo } from "react";
import "../../styles/sidebar.css";

// Constants for better maintainability
const CHALLENGES_DATA = [
  {
    id: 1,
    title: "Daily Engagement",
    tag: "engagement",
    task: "React to 5 posts",
    icon: "fa-thumbs-up",
    progress: 2,
    total: 5,
    xp: 50,
    coins: 10,
  },
  {
    id: 2,
    title: "Community Builder",
    tag: "social",
    task: "Comment on 3 posts",
    icon: "fa-comment-dots",
    progress: 1,
    total: 3,
    xp: 75,
    coins: 15,
  },
  {
    id: 3,
    title: "Content Creator",
    tag: "content",
    task: "Share your training session",
    icon: "fa-share-nodes",
    progress: 0,
    total: 1,
    xp: 100,
    coins: 20,
  },
  {
    id: 4,
    title: "Skill Sharpener",
    tag: "skill",
    task: "Complete skill assessment",
    icon: "fa-brain",
    progress: 0,
    total: 1,
    xp: 125,
    coins: 25,
  },
  {
    id: 5,
    title: "Network Expander",
    tag: "social",
    task: "Connect with 2 players",
    icon: "fa-users",
    progress: 0,
    total: 2,
    xp: 60,
    coins: 12,
  },
];

const MATCHES_DATA = [
  {
    id: 1,
    date: "Nov 8, 2:00 PM",
    team1: "India",
    team2: "Australia",
  },
  {
    id: 2,
    date: "Nov 9, 6:30 PM",
    team1: "England",
    team2: "Pakistan",
  },
  {
    id: 3,
    date: "Nov 10, 10:00 AM",
    team1: "South Africa",
    team2: "New Zealand",
  },
];

const TABS = {
  PREDICT: "predict",
  LEADERBOARD: "leaderboard",
  REWARDS: "rewards"
};

export default function Sidebar() {
  const [progressValues, setProgressValues] = useState([]);
  const [timeLeft, setTimeLeft] = useState("");
  const [activeTab, setActiveTab] = useState(TABS.PREDICT);
  const [selectedTeams, setSelectedTeams] = useState({});
  const [completedChallenges, setCompletedChallenges] = useState(0);
  const [totalXP, setTotalXP] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Memoized calculations
  const totalPossibleXP = useMemo(() => 
    CHALLENGES_DATA.reduce((total, ch) => total + ch.xp, 0), 
  []);

  const overallProgress = useMemo(() => 
    (totalXP / totalPossibleXP) * 100, 
  [totalXP, totalPossibleXP]);

  // Calculate completed challenges and total XP
  useEffect(() => {
    const completed = CHALLENGES_DATA.filter(ch => ch.progress >= ch.total).length;
    const xp = CHALLENGES_DATA.reduce((total, ch) => 
      total + (ch.progress >= ch.total ? ch.xp : 0), 0
    );
    
    setCompletedChallenges(completed);
    setTotalXP(xp);
    setIsLoading(false);
  }, []);

  // Animate progress bars after component loads
  useEffect(() => {
    const timer = setTimeout(() => {
      const values = CHALLENGES_DATA.map((ch) => (ch.progress / ch.total) * 100);
      setProgressValues(values);
    }, 250);

    return () => clearTimeout(timer);
  }, []);

  // Format time function with useCallback
  const formatTime = useCallback((sec) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }, []);

  // Reset timer every 24 hours
  useEffect(() => {
    const totalSeconds = 24 * 60 * 60;
    let remaining = totalSeconds;

    const timer = setInterval(() => {
      remaining -= 1;
      if (remaining <= 0) {
        remaining = totalSeconds;
      }
      setTimeLeft(formatTime(remaining));
    }, 1000);

    return () => clearInterval(timer);
  }, [formatTime]);

  // Event handlers with useCallback
  const handleTeamSelect = useCallback((matchId, team) => {
    setSelectedTeams(prev => ({
      ...prev,
      [matchId]: team
    }));
  }, []);

  const handleChallengeClick = useCallback((challengeId) => {
    // In a real app, this would make an API call
    console.log(`Challenge ${challengeId} clicked - would update progress`);
    // You could add optimistic updates here
  }, []);

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  // Memoized challenge cards for better performance
  const challengeCards = useMemo(() => 
    CHALLENGES_DATA.map((challenge, index) => (
      <ChallengeCard 
        key={challenge.id}
        challenge={challenge}
        progressValue={progressValues[index] || 0}
        onClick={handleChallengeClick}
      />
    )), 
  [progressValues, handleChallengeClick]);

  // Memoized match predictions
  const matchPredictions = useMemo(() => 
    MATCHES_DATA.map((match) => (
      <MatchCard 
        key={match.id}
        match={match}
        selectedTeam={selectedTeams[match.id]}
        onTeamSelect={handleTeamSelect}
      />
    )), 
  [selectedTeams, handleTeamSelect]);

  if (isLoading) {
    return (
      <div className="sidebar-container">
        <div className="daily-card loading">
          <div className="loading-placeholder">Loading challenges...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="sidebar-container" role="complementary" aria-label="User dashboard sidebar">
      {/* DAILY CHALLENGES CARD */}
      <DailyChallengesCard 
        timeLeft={timeLeft}
        completedChallenges={completedChallenges}
        totalXP={totalXP}
        totalPossibleXP={totalPossibleXP}
        overallProgress={overallProgress}
        challengeCards={challengeCards}
      />

      {/* PREDICTION LEAGUE CARD */}
      <PredictionLeagueCard 
        activeTab={activeTab}
        onTabChange={handleTabChange}
        matchPredictions={matchPredictions}
        selectedTeams={selectedTeams}
      />
    </div>
  );
}

// Extracted Challenge Card Component
const ChallengeCard = React.memo(({ challenge, progressValue, onClick }) => {
  const isCompleted = challenge.progress >= challenge.total;
  
  return (
    <div 
      className={`task-card ${isCompleted ? 'completed' : ''}`} 
      onClick={() => onClick(challenge.id)}
      role="button"
      tabIndex={0}
      aria-label={`${challenge.title}: ${challenge.task}. Progress: ${challenge.progress} out of ${challenge.total}`}
      onKeyPress={(e) => (e.key === 'Enter' || e.key === ' ') && onClick(challenge.id)}
    >
      <div className="task-left">
        <div className="task-icon" aria-hidden="true">
          <i className={`fa-solid ${challenge.icon}`}></i>
        </div>
        <div className="task-content">
          <p className="task-title">
            {challenge.title}
            <span className="tag" aria-label={`Category: ${challenge.tag}`}>
              {challenge.tag}
            </span>
          </p>
          <p className="task-desc">{challenge.task}</p>
        </div>
      </div>

      {/* TASK PROGRESS BAR */}
      <div className="progress-small" role="progressbar" 
           aria-valuenow={progressValue} aria-valuemin="0" aria-valuemax="100">
        <div
          className="progress-small-fill"
          style={{ width: `${progressValue}%` }}
        ></div>
      </div>

      <div className="task-bottom">
        <div className="task-rewards">
          <span className="reward xp">+{challenge.xp} XP</span>
          <span className="reward coins">+{challenge.coins} Coins</span>
        </div>
        <div className="task-progress">
          {challenge.progress}/{challenge.total}
        </div>
      </div>
    </div>
  );
});

// Extracted Daily Challenges Card Component
const DailyChallengesCard = React.memo(({ 
  timeLeft, 
  completedChallenges, 
  totalXP, 
  totalPossibleXP, 
  overallProgress,
  challengeCards 
}) => (
  <div className="daily-card">
    <div className="daily-header">
      <h5 className="daily-title">
        <i className="fa-solid fa-bolt header-icon" aria-hidden="true"></i>
        Daily Challenges
      </h5>
      <div className="reset-box">
        <span className="reset-time">{timeLeft}</span>
        <span className="reset-label">Resets in</span>
      </div>
    </div>

    <p className="completed">{completedChallenges}/5 completed</p>

    {/* OVERALL PROGRESS */}
    <div className="total-progress">
      <div className="progress-info">
        <span>Total Progress</span>
        <span className="xp-num">{totalXP}/{totalPossibleXP} XP</span>
      </div>
      <div className="progress-bar" role="progressbar" 
           aria-valuenow={overallProgress} aria-valuemin="0" aria-valuemax="100">
        <div 
          className="progress-fill total"
          style={{ width: `${overallProgress}%` }}
        ></div>
      </div>
    </div>

    {/* TASKS */}
    {challengeCards}
  </div>
));

// Extracted Match Card Component
const MatchCard = React.memo(({ match, selectedTeam, onTeamSelect }) => (
  <div className="match-card">
    <p className="match-time">
      <i className="fa-regular fa-clock" aria-hidden="true"></i> 
      {match.date}
    </p>
    <p className="who">Who will win?</p>
    <div className="team-buttons">
      <button 
        className={`team-btn ${selectedTeam === match.team1 ? 'selected' : ''}`}
        onClick={() => onTeamSelect(match.id, match.team1)}
        aria-pressed={selectedTeam === match.team1}
        aria-label={`Select ${match.team1} to win`}
      >
        {match.team1}
      </button>
      <button 
        className={`team-btn ${selectedTeam === match.team2 ? 'selected' : ''}`}
        onClick={() => onTeamSelect(match.id, match.team2)}
        aria-pressed={selectedTeam === match.team2}
        aria-label={`Select ${match.team2} to win`}
      >
        {match.team2}
      </button>
    </div>
    <p className="points-note">+50 points for correct prediction</p>
  </div>
));

// Extracted Prediction League Card Component
const PredictionLeagueCard = React.memo(({ activeTab, onTabChange, matchPredictions }) => (
  <div className="predict-card">
    <div className="predict-header">
      <div>
        <h5 className="title">
          <i className="fa-solid fa-bullseye header-icon" aria-hidden="true"></i> 
          Prediction League
        </h5>
        <p className="subtitle">Predict & Earn Rewards</p>
      </div>
      <button className="week-btn" aria-label="Switch to weekly view">
        <i className="fa-solid fa-calendar-week" aria-hidden="true"></i> Weekly
      </button>
    </div>

    {/* TABS */}
    <div className="tabs" role="tablist">
      <button 
        className={`tab ${activeTab === TABS.PREDICT ? 'active' : ''}`}
        onClick={() => onTabChange(TABS.PREDICT)}
        role="tab"
        aria-selected={activeTab === TABS.PREDICT}
        aria-controls="predict-panel"
      >
        Predict
      </button>
      <button 
        className={`tab ${activeTab === TABS.LEADERBOARD ? 'active' : ''}`}
        onClick={() => onTabChange(TABS.LEADERBOARD)}
        role="tab"
        aria-selected={activeTab === TABS.LEADERBOARD}
        aria-controls="leaderboard-panel"
      >
        Leaderboard
      </button>
      <button 
        className={`tab ${activeTab === TABS.REWARDS ? 'active' : ''}`}
        onClick={() => onTabChange(TABS.REWARDS)}
        role="tab"
        aria-selected={activeTab === TABS.REWARDS}
        aria-controls="rewards-panel"
      >
        Rewards
      </button>
    </div>

    {/* CONTENT BASED ACTIVE TAB */}
    <div role="tabpanel" id={`${activeTab}-panel`}>
      {activeTab === TABS.PREDICT && (
        <>
          {/* STATS */}
          <div className="stats">
            <div className="stat-box">
              <p className="stat-label">
                <i className="fa-solid fa-arrow-trend-up" aria-hidden="true"></i> Accuracy
              </p>
              <h3 className="stat-value">73%</h3>
            </div>
            <div className="stat-box">
              <p className="stat-label">
                <i className="fa-solid fa-fire" aria-hidden="true"></i> Streak
              </p>
              <h3 className="stat-value">7</h3>
            </div>
            <div className="stat-box">
              <p className="stat-label">
                <i className="fa-solid fa-star" aria-hidden="true"></i> Points
              </p>
              <h3 className="stat-value">1,980</h3>
            </div>
          </div>

          {/* MATCH LIST */}
          {matchPredictions}
        </>
      )}

      {activeTab === TABS.LEADERBOARD && (
        <div className="tab-content">
          <div className="leaderboard-placeholder">
            <i className="fa-solid fa-trophy" aria-hidden="true"></i>
            <p>Leaderboard coming soon!</p>
          </div>
        </div>
      )}

      {activeTab === TABS.REWARDS && (
        <div className="tab-content">
          <div className="rewards-placeholder">
            <i className="fa-solid fa-gift" aria-hidden="true"></i>
            <p>Rewards information coming soon!</p>
          </div>
        </div>
      )}
    </div>

    {/* BOTTOM BUTTON */}
    <button className="challenge-btn" aria-label="Challenge friends to prediction league">
      <i className="fa-solid fa-users" aria-hidden="true"></i> Challenge Friends
    </button>
  </div>
));
import React, { useRef, useState, useCallback, useMemo } from "react";
import "../../styles/post.css";

// Constants for better maintainability
const INITIAL_POSTS = [
  {
    id: 1,
    username: "virat.kohli",
    avatar: "https://i.pravatar.cc/50?img=32",
    location: "Melbourne",
    time: "1 hr ago",
    image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=500",
    likes: 89765,
    caption:
      "What a thrilling match at the MCG! The crowd support was incredible 🔥 Special thanks to all the fans. On to the next challenge!",
    comments: 2156,
    isLiked: false,
    isSaved: false,
    commentsList: [
      {
        id: 1,
        user: "rohit.sharma",
        text: "Great game skip! 🔥",
        likes: 234,
        isLiked: false,
      },
      {
        id: 2,
        user: "msdhoni",
        text: "Well played 👏",
        likes: 189,
        isLiked: false,
      },
    ],
  },
  // ... (other posts remain the same, but I'll truncate for brevity)
  {
    id: 2,
    username: "rohit.sharma",
    avatar: "https://i.pravatar.cc/50?img=45",
    location: "Nagpur",
    time: "2 hr ago",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=500",
    likes: 75654,
    caption: "Practice session done! Ready for the next big clash. 💪🔥",
    comments: 987,
    isLiked: false,
    isSaved: false,
    commentsList: [
      {
        id: 1,
        user: "virat.kohli",
        text: "Looking solid bro! 💙",
        likes: 142,
        isLiked: false,
      },
    ],
  },
  {
    id: 3,
    username: "hardik.pandya",
    avatar: "https://i.pravatar.cc/50?img=11",
    location: "Mumbai",
    time: "5 hr ago",
    image: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?w=500",
    likes: 64532,
    caption: "Power-hitting drills today. Feeling strong 💥💥",
    comments: 562,
    isLiked: false,
    isSaved: false,
    commentsList: [
      {
        id: 1,
        user: "surya.yadav",
        text: "Bombing shots 🔥🔥",
        likes: 112,
        isLiked: false,
      },
    ],
  },

  {
    id: 4,
    username: "msdhoni",
    avatar: "https://i.pravatar.cc/50?img=14",
    location: "Ranchi",
    time: "1 day ago",
    image: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?w=500",
    likes: 98743,
    caption: "Nothing like practicing at home turf. Ranchi ❤️",
    comments: 2654,
    isLiked: false,
    isSaved: false,
    commentsList: [
      {
        id: 1,
        user: "virat.kohli",
        text: "Legend ❤️",
        likes: 899,
        isLiked: false,
      },
    ],
  },

  {
    id: 5,
    username: "smriti.m",
    avatar: "https://i.pravatar.cc/50?img=12",
    location: "Training Ground",
    time: "3 hr ago",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=500",
    likes: 45234,
    caption:
      "Training hard for the upcoming Women’s World Cup! Every session counts 💪🔥",
    comments: 891,
    isLiked: false,
    isSaved: false,
    commentsList: [
      {
        id: 1,
        user: "harmankaur",
        text: "Let’s dominate this season! 🔥💙",
        likes: 178,
        isLiked: false,
      },
    ],
  },

  {
    id: 6,
    username: "bumrah.jasprit",
    avatar: "https://i.pravatar.cc/50?img=20",
    location: "Dubai",
    time: "6 hr ago",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500",
    likes: 56321,
    caption: "Perfecting the yorkers today. Rhythm feels great 🎯🔥",
    comments: 374,
    isLiked: false,
    isSaved: false,
    commentsList: [
      {
        id: 1,
        user: "hardik.pandya",
        text: "Unplayable 🔥🔥",
        likes: 89,
        isLiked: false,
      },
    ],
  },

  {
    id: 7,
    username: "surya.yadav",
    avatar: "https://i.pravatar.cc/50?img=24",
    location: "Pune",
    time: "30 min ago",
    image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=500",
    likes: 33456,
    caption: "Experimenting with new shots ⚡ Innovative cricket never stops!",
    comments: 344,
    isLiked: false,
    isSaved: false,
    commentsList: [
      {
        id: 1,
        user: "rohit.sharma",
        text: "Sky is the limit 😎💫",
        likes: 155,
        isLiked: false,
      },
    ],
  },

  {
    id: 8,
    username: "shreyas.iyer",
    avatar: "https://i.pravatar.cc/50?img=36",
    location: "Delhi",
    time: "4 hr ago",
    image: "https://images.unsplash.com/photo-1520975918319-537a6aef4e3e?w=500",
    likes: 28765,
    caption: "Back to the grind! Consistency is the key 🔑🔥",
    comments: 221,
    isLiked: false,
    isSaved: false,
    commentsList: [
      {
        id: 1,
        user: "virat.kohli",
        text: "Keep pushing champ! 💪",
        likes: 102,
        isLiked: false,
      },
    ],
  },

  {
    id: 9,
    username: "harmankaur",
    avatar: "https://i.pravatar.cc/50?img=38",
    location: "London",
    time: "7 hr ago",
    image: "https://images.unsplash.com/photo-1520975918319-537a6aef4e3e?w=500",
    likes: 43422,
    caption: "Focused & ready. Big tournament ahead! 🏆💪",
    comments: 562,
    isLiked: false,
    isSaved: false,
    commentsList: [
      {
        id: 1,
        user: "smriti.m",
        text: "Let’s go captain! 🔥🔥",
        likes: 201,
        isLiked: false,
      },
    ],
  },

  {
    id: 10,
    username: "gill.shubman",
    avatar: "https://i.pravatar.cc/50?img=47",
    location: "Hyderabad",
    time: "10 min ago",
    image: "https://images.unsplash.com/photo-1520975918319-537a6aef4e3e?w=500",
    likes: 67432,
    caption: "Fresh pitch, fresh mindset. Feeling ready 🔥",
    comments: 743,
    isLiked: false,
    isSaved: false,
    commentsList: [
      {
        id: 1,
        user: "hardik.pandya",
        text: "King mode! 👑🔥",
        likes: 132,
        isLiked: false,
      },
    ],
  },
];

export default function Post() {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [commentText, setCommentText] = useState({});
  const [expandedComments, setExpandedComments] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);
  const [postContent, setPostContent] = useState("");
  const inputRef = useRef(null);

  // Memoized handlers for better performance
  const handleLike = useCallback((postId) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              isLiked: !post.isLiked,
            }
          : post
      )
    );
  }, []);

  const handleSave = useCallback((postId) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, isSaved: !post.isSaved } : post
      )
    );
  }, []);

  const handleAddComment = useCallback(
    (postId) => {
      const text = commentText[postId]?.trim();
      if (!text) return;

      const newComment = {
        id: Date.now(),
        user: "you",
        text: text,
        likes: 0,
        isLiked: false,
      };

      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId
            ? {
                ...post,
                commentsList: [...post.commentsList, newComment],
                comments: post.comments + 1,
              }
            : post
        )
      );

      setCommentText((prev) => ({ ...prev, [postId]: "" }));
    },
    [commentText]
  );

  const toggleComments = useCallback((postId) => {
    setExpandedComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  }, []);

  const handleCommentChange = useCallback((postId, text) => {
    setCommentText((prev) => ({ ...prev, [postId]: text }));
  }, []);

  const handleCommentLike = useCallback((postId, commentId) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;

        return {
          ...post,
          commentsList: post.commentsList.map((c) =>
            c.id === commentId
              ? {
                  ...c,
                  isLiked: !c.isLiked,
                  likes: c.isLiked ? c.likes - 1 : c.likes + 1,
                }
              : c
          ),
        };
      })
    );
  }, []);

  const handleDoubleClick = useCallback(
    (postId) => {
      handleLike(postId);
      const likeElement = document.getElementById(`like-animation-${postId}`);
      if (!likeElement) return;

      likeElement.style.display = "flex";
      setTimeout(() => (likeElement.style.display = "none"), 900);
    },
    [handleLike]
  );

  // Create Post Modal Handlers
  const handleInputClick = useCallback(() => {
    setIsExpanded(true);
  }, []);

  const handleCancel = useCallback(() => {
    setIsExpanded(false);
    setPostContent("");
  }, []);

  const handlePostSubmit = useCallback(() => {
    if (postContent.trim()) {
      // In real app, this would submit to backend
      console.log("Posting:", postContent);
      setIsExpanded(false);
      setPostContent("");
    }
  }, [postContent]);

  const handleBackgroundClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget) {
        handleCancel();
      }
    },
    [handleCancel]
  );

  const handleCommentKeyPress = useCallback(
    (e, postId) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleAddComment(postId);
      }
    },
    [handleAddComment]
  );

  // Memoized post components for better performance
  const postComponents = useMemo(
    () =>
      posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          commentText={commentText[post.id] || ""}
          isExpanded={expandedComments[post.id]}
          onLike={handleLike}
          onSave={handleSave}
          onAddComment={handleAddComment}
          onToggleComments={toggleComments}
          onCommentChange={handleCommentChange}
          onCommentLike={handleCommentLike}
          onDoubleClick={handleDoubleClick}
          onCommentKeyPress={handleCommentKeyPress}
        />
      )),
    [
      posts,
      commentText,
      expandedComments,
      handleLike,
      handleSave,
      handleAddComment,
      toggleComments,
      handleCommentChange,
      handleCommentLike,
      handleDoubleClick,
      handleCommentKeyPress,
    ]
  );

  return (
    <div className="feed-section">
      {/* CREATE POST CARD */}
      <CreatePostCard
        inputRef={inputRef}
        postContent={postContent}
        onInputClick={handleInputClick}
        onContentChange={setPostContent}
      />

      {/* EXPANDED POST MODAL */}
      {isExpanded && (
        <ExpandedPostModal
          postContent={postContent}
          onContentChange={setPostContent}
          onCancel={handleCancel}
          onSubmit={handlePostSubmit}
          onBackgroundClick={handleBackgroundClick}
        />
      )}

      {/* POSTS LIST */}
      {postComponents}
    </div>
  );
}

// Extracted Create Post Card Component
const CreatePostCard = React.memo(
  ({ inputRef, postContent, onInputClick, onContentChange }) => (
    <div className="create-post-card">
      <div className="create-post-header">
        <img
          src="https://i.pravatar.cc/50?img=5"
          className="create-post-avatar"
          alt="Your profile"
        />
        <div className="create-post-input">
          <input
            ref={inputRef}
            type="text"
            placeholder="Share your cricket journey..."
            className="post-input"
            onClick={onInputClick}
            value={postContent}
            onChange={(e) => onContentChange(e.target.value)}
            readOnly
          />
          <div className="post-options">
            <i className="fa-solid fa-image" aria-label="Add photo"></i>
            <i className="fa-solid fa-video" aria-label="Add video"></i>
            <i className="fa-solid fa-calendar me-2" aria-label="Add event"></i>
          </div>
        </div>
      </div>
    </div>
  )
);

// Extracted Expanded Post Modal Component
const ExpandedPostModal = React.memo(
  ({ postContent, onContentChange, onCancel, onSubmit, onBackgroundClick }) => (
    <div className="post-modal-overlay" onClick={onBackgroundClick}>
      <div className="expanded-post-card">
        <div className="expanded-post-header">
          <h3>Create Post</h3>
          <button
            className="close-btn"
            onClick={onCancel}
            aria-label="Close post creation"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="expanded-user-info">
          <img
            src="https://i.pravatar.cc/50?img=5"
            className="expanded-avatar"
            alt="Your profile"
          />
          <div className="user-details">
            <span className="user-name">You</span>
            <span className="post-privacy">
              <i className="fa-solid fa-earth-americas"></i> Public
            </span>
          </div>
        </div>

        <div className="post-textarea-container">
          <textarea
            className="post-textarea"
            placeholder="What's happening in your cricket world?"
            value={postContent}
            onChange={(e) => onContentChange(e.target.value)}
            autoFocus
            aria-label="Post content"
          />
        </div>

        <div className="media-options">
          <div className="media-option" role="button" tabIndex={0}>
            <i className="fa-solid fa-image"></i>
            <span>Photo</span>
          </div>
          <div className="media-option" role="button" tabIndex={0}>
            <i className="fa-solid fa-video"></i>
            <span>Video</span>
          </div>
          <div className="media-option" role="button" tabIndex={0}>
            <i className="fa-solid fa-location-dot"></i>
            <span>Location</span>
          </div>
        </div>

        <div className="post-action-buttons">
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="submit-post-btn"
            onClick={onSubmit}
            disabled={!postContent.trim()}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  )
);

// Extracted Post Card Component
const PostCard = React.memo(
  ({
    post,
    commentText,
    isExpanded,
    onLike,
    onSave,
    onAddComment,
    onToggleComments,
    onCommentChange,
    onCommentLike,
    onDoubleClick,
    onCommentKeyPress,
  }) => {
    const handleCommentSubmit = () => {
      onAddComment(post.id);
    };

    return (
      <div className="post-card" key={post.id}>
        <div className="post-header">
          <div className="post-user-info">
            <img
              src={post.avatar}
              className="avatar"
              alt={`${post.username}'s profile`}
            />
            <div>
              <p className="post-user">
                {post.username}{" "}
                <span className="verify" aria-label="Verified">
                  ✔
                </span>
              </p>
              <p className="post-time">
                {post.location} • {post.time}
              </p>
            </div>
          </div>
          <button className="more-options" aria-label="More options">
            <i className="fa-solid fa-ellipsis"></i>
          </button>
        </div>

        <div
          className="post-image-container"
          onDoubleClick={() => onDoubleClick(post.id)}
          role="button"
          tabIndex={0}
          aria-label="Double click to like post"
        >
          <img
            src={post.image}
            className="post-img"
            alt={`Post by ${post.username}`}
          />
          <div className="like-animation" id={`like-animation-${post.id}`}>
            <i className="fa-solid fa-heart"></i>
          </div>
        </div>

        <div className="post-actions">
          <div className="action-buttons">
            <button
              className={`action-btn like-btn ${post.isLiked ? "liked" : ""}`}
              onClick={() => onLike(post.id)}
              aria-label={post.isLiked ? "Unlike post" : "Like post"}
            >
              <i
                className={`fa-${post.isLiked ? "solid" : "regular"} fa-heart`}
              ></i>
            </button>

            <button
              className="action-btn comment-btn"
              onClick={() => onToggleComments(post.id)}
              aria-label="Comment on post"
            >
              <i className="fa-regular fa-comment"></i>
            </button>

            <button className="action-btn share-btn" aria-label="Share post">
              <i className="fa-regular fa-paper-plane"></i>
            </button>
          </div>

          <button
            className={`action-btn save-btn ${post.isSaved ? "saved" : ""}`}
            onClick={() => onSave(post.id)}
            aria-label={post.isSaved ? "Unsave post" : "Save post"}
          >
            <i
              className={`fa-${post.isSaved ? "solid" : "regular"} fa-bookmark`}
            ></i>
          </button>
        </div>

        <div className="post-stats">
          <p className="likes">{post.likes.toLocaleString()} likes</p>

          <p className="post-text">
            <span className="username">{post.username}</span> {post.caption}
          </p>

          {!isExpanded && post.commentsList.length > 0 && (
            <button
              className="view-comments"
              onClick={() => onToggleComments(post.id)}
              aria-expanded="false"
            >
              View all {post.comments.toLocaleString()} comments
            </button>
          )}

          {isExpanded && (
            <div className="comments-section">
              {post.commentsList.map((comment) => (
                <div key={comment.id} className="comment">
                  <p className="comment-text">
                    <span className="username">{comment.user}</span>{" "}
                    {comment.text}
                  </p>

                  <button
                    className="comment-like"
                    onClick={() => onCommentLike(post.id, comment.id)}
                    aria-label={
                      comment.isLiked ? "Unlike comment" : "Like comment"
                    }
                  >
                    <i
                      className={`fa-${
                        comment.isLiked ? "solid" : "regular"
                      } fa-heart`}
                    ></i>
                    <small>{comment.likes}</small>
                  </button>
                </div>
              ))}

              <button
                className="hide-comments"
                onClick={() => onToggleComments(post.id)}
              >
                Hide comments
              </button>
            </div>
          )}

          <p className="post-time-ago">{post.time.toUpperCase()}</p>
        </div>

        <div className="add-comment">
          <input
            type="text"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => onCommentChange(post.id, e.target.value)}
            onKeyPress={(e) => onCommentKeyPress(e, post.id)}
            aria-label="Add a comment"
          />
          <button
            className={`comment-submit-btn ${
              commentText.trim() ? "active" : ""
            }`}
            onClick={handleCommentSubmit}
            disabled={!commentText.trim()}
            aria-label="Post comment"
          >
            Post
          </button>
        </div>
      </div>
    );
  }
);

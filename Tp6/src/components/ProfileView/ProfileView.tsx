import React from "react";
import type { Post } from "../../types";
import { useUser } from "../../context/UserContext";
import "./ProfileView.css";

interface ProfileViewProps {
  posts: Post[];
  onSelectPost: (post: Post) => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ posts, onSelectPost }) => {
  // Obtiene el usuario actual desde el Context global
  const { user } = useUser();
  return (
    <div className="profile">
      {/* Profile header */}
      <div className="profile__header">
        <div className="profile__avatar-wrapper">
          <img
            src={`https://cataas.com/cat?width=150&height=150&_=profilebig`}
            alt="Profile"
            className="profile__avatar"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://api.dicebear.com/7.x/adventurer/svg?seed=gato";
            }}
          />
        </div>

        <div className="profile__info">
          <div className="profile__name-row">
            <h1 className="profile__name">{user.name}</h1>
            {user.verified && (
              <span className="profile__verified">✓</span>
            )}
            <button className="profile__edit-btn">Edit Profile</button>
            <button className="profile__settings-btn" aria-label="Settings">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </button>
          </div>

          <div className="profile__stats">
            <div className="profile__stat">
              <span className="profile__stat-value">{posts.length}</span>
              <span className="profile__stat-label">posts</span>
            </div>
            <div className="profile__stat">
              <span className="profile__stat-value">{user.followers}</span>
              <span className="profile__stat-label">followers</span>
            </div>
            <div className="profile__stat">
              <span className="profile__stat-value">842</span>
              <span className="profile__stat-label">following</span>
            </div>
          </div>

          <div className="profile__username">{user.username}</div>
          <div className="profile__bio">{user.bio}</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="profile__tabs">
        <button className="profile__tab profile__tab--active">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
          POSTS
        </button>
        <button className="profile__tab">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
          SAVED
        </button>
        <button className="profile__tab">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          TAGGED
        </button>
      </div>

      {/* Posts grid */}
      <div className="profile__grid">
        {posts.map((post) => (
          <div
            key={post.id}
            className="profile__grid-item"
            onClick={() => onSelectPost(post)}
          >
            <img
              src={post.imageUrl}
              alt={post.caption}
              className="profile__grid-image"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  `https://cataas.com/cat?width=300&height=300&_=pg${post.id}`;
              }}
            />
            <div className="profile__grid-overlay">
              <span>
                <svg viewBox="0 0 24 24" fill="white" stroke="none">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                {post.likes}
              </span>
              <span>
                <svg viewBox="0 0 24 24" fill="white" stroke="none">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                {post.comments.length}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileView;

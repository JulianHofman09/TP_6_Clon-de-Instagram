import React from "react";
import type { Post } from "../../types";
import "./PostCard.css";

interface PostCardProps {
  post: Post;
  onSelect: (post: Post) => void;
  onLike: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onSelect, onLike }) => {
  return (
    <div className="post-card">
      <div className="post-card__image-wrapper" onClick={() => onSelect(post)}>
        <img
          src={post.imageUrl}
          alt={post.caption}
          className="post-card__image"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              `https://cataas.com/cat?width=400&height=400&_=err${post.id}`;
          }}
        />
        <div className="post-card__overlay">
          <div className="post-card__overlay-actions">
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
      </div>
      <div className="post-card__footer">
        <div className="post-card__user">
          <img
            src={post.avatarUrl}
            alt={post.username}
            className="post-card__avatar"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                `https://cataas.com/cat?width=30&height=30&_=av${post.id}`;
            }}
          />
          <span className="post-card__username">{post.username}</span>
        </div>
        <div className="post-card__actions">
          <button
            className={`post-card__action-btn ${post.liked ? "post-card__action-btn--liked" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              onLike(post.id);
            }}
            aria-label="Like"
          >
            <svg viewBox="0 0 24 24" fill={post.liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
          <button className="post-card__action-btn" aria-label="Comment" onClick={() => onSelect(post)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </button>
          <button className="post-card__action-btn" aria-label="Share">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;

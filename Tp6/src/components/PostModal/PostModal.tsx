import React, { useState, useEffect } from "react";
import type { Post } from "../../types";
import "./PostModal.css";

interface PostModalProps {
  post: Post | null;
  onClose: () => void;
  onLike: (postId: string) => void;
}

const PostModal: React.FC<PostModalProps> = ({ post, onClose, onLike }) => {
  const [newComment, setNewComment] = useState("");
  const [localComments, setLocalComments] = useState(post?.comments || []);

  useEffect(() => {
    if (post) {
      setLocalComments(post.comments);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [post]);

  if (!post) return null;

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const comment = {
      id: Date.now(),
      user: "@gato_lover0",
      text: newComment.trim(),
    };
    setLocalComments((prev) => [...prev, comment]);
    setNewComment("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleAddComment();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal">
        {/* Close button */}
        <button className="modal__close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Image side */}
        <div className="modal__image-side">
          <img
            src={post.imageUrl}
            alt={post.caption}
            className="modal__image"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                `https://cataas.com/cat?width=600&height=600&_=modal${post.id}`;
            }}
          />
        </div>

        {/* Content side */}
        <div className="modal__content-side">
          {/* Header */}
          <div className="modal__header">
            <img
              src={post.avatarUrl}
              alt={post.username}
              className="modal__avatar"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  `https://cataas.com/cat?width=40&height=40&_=mav${post.id}`;
              }}
            />
            <div className="modal__user-info">
              <span className="modal__username">{post.username}</span>
              <span className="modal__date">{post.date}</span>
            </div>
            <button className="modal__more-btn">•••</button>
          </div>

          {/* Caption */}
          <div className="modal__caption">
            <span className="modal__caption-user">{post.username}</span>{" "}
            {post.caption}
          </div>

          {/* Comments */}
          <div className="modal__comments">
            {localComments.map((comment) => (
              <div key={comment.id} className="modal__comment">
                <span className="modal__comment-user">{comment.user}</span>
                <span className="modal__comment-text">{comment.text}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="modal__actions">
            <div className="modal__action-buttons">
              <button
                className={`modal__action-btn ${post.liked ? "modal__action-btn--liked" : ""}`}
                onClick={() => onLike(post.id)}
                aria-label="Like"
              >
                <svg viewBox="0 0 24 24" fill={post.liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
              <button className="modal__action-btn" aria-label="Comment">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </button>
              <button className="modal__action-btn" aria-label="Share">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
            <div className="modal__likes">
              {post.likes.toLocaleString()} likes
            </div>
          </div>

          {/* Add comment */}
          <div className="modal__add-comment">
            <input
              type="text"
              placeholder="Add a comment..."
              className="modal__comment-input"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="modal__post-btn"
              onClick={handleAddComment}
              disabled={!newComment.trim()}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;

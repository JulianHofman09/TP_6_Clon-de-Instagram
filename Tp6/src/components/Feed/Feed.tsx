import React from "react";
import type { Post } from "../../types";
import PostCard from "../PostCard/PostCard";
import "./Feed.css";

interface FeedProps {
  posts: Post[];
  loading: boolean;
  onSelectPost: (post: Post) => void;
  onLike: (postId: string) => void;
}

const Feed: React.FC<FeedProps> = ({ posts, loading, onSelectPost, onLike }) => {
  if (loading) {
    return (
      <div className="feed__loading">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="feed__skeleton" />
        ))}
      </div>
    );
  }

  return (
    <section className="feed">
      <h2 className="feed__title">TRENDİNG</h2>
      <div className="feed__grid">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onSelect={onSelectPost}
            onLike={onLike}
          />
        ))}
      </div>
    </section>
  );
};

export default Feed;

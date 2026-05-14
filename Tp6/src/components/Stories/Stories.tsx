import React from "react";
import type { Story } from "../../types";
import "./Stories.css";

interface StoriesProps {
  stories: Story[];
}

const Stories: React.FC<StoriesProps> = ({ stories }) => {
  return (
    <section className="stories">
      <h2 className="stories__title">STORİES</h2>
      <div className="stories__list">
        {stories.map((story) => (
          <div key={story.id} className="stories__item">
            <div className="stories__avatar-ring">
              <img
                src={story.imageUrl}
                alt={story.username}
                className="stories__avatar"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    `https://cataas.com/cat?width=70&height=70&_=${story.id}`;
                }}
              />
            </div>
            <span className="stories__username">{story.username}</span>
          </div>
        ))}
        <button className="stories__next-btn" aria-label="Next stories">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Stories;

import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Stories from "./components/Stories/Stories";
import Feed from "./components/Feed/Feed";
import PostModal from "./components/PostModal/PostModal";
import ProfileView from "./components/ProfileView/ProfileView";
import type { Post, Story } from "./types";
import { mockComments, captions, storyUsers } from "./data/userData";
import "./App.css";

const CAT_API_URL = "https://api.thecatapi.com/v1/images/search";

const usernames = [
  "@whiskers_fan",
  "@cat_daily",
  "@meow_world",
  "@fluffy_tales",
  "@purrfect_shots",
  "@kitty_gram",
  "@catlover99",
  "@feline_vibes",
  "@pawsome_pics",
  "@catlife_official",
  "@nyan_cat",
  "@tabby_tales",
];

function buildPost(id: string, url: string, index: number): Post {
  return {
    id,
    imageUrl: url,
    username: usernames[index % usernames.length],
    avatarUrl: `https://cataas.com/cat?width=40&height=40&_=av${index}`,
    caption: captions[index % captions.length],
    likes: 500 + index * 317,
    liked: false,
    comments: mockComments.slice(0, (index % 4) + 1),
    date: new Date(Date.now() - index * 3600000 * 24).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    }),
  };
}

function buildFallbackPosts(): Post[] {
  return Array.from({ length: 12 }, (_, i) =>
    buildPost(
      `cat-${i}`,
      `https://cataas.com/cat?width=400&height=${300 + (i % 3) * 100}&_=post${i}`,
      i
    )
  );
}

function buildStories(): Story[] {
  return Array.from({ length: 7 }, (_, i) => ({
    id: i,
    username: storyUsers[i % storyUsers.length],
    imageUrl: `https://cataas.com/cat?width=70&height=70&_=story${i}`,
  }));
}

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [stories] = useState<Story[]>(buildStories);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [currentView, setCurrentView] = useState<"home" | "profile">("home");

  useEffect(() => {
    let cancelled = false;

    async function fetchCats() {
      setLoading(true);
      try {
        const response = await axios.get(CAT_API_URL, {
          params: { limit: 12, mime_types: "jpg,png" },
          timeout: 8000,
        });
        if (cancelled) return;
        const data = response.data as Array<{ id: string; url: string }>;
        const fetchedPosts = data.map((cat, i) => buildPost(cat.id, cat.url, i));
        setPosts(fetchedPosts);
      } catch (err) {
        console.warn("The Cat API failed, using fallback:", err);
        if (!cancelled) {
          setPosts(buildFallbackPosts());
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchCats();
    return () => { cancelled = true; };
  }, []);

  const handleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
    setSelectedPost((prev) =>
      prev && prev.id === postId
        ? { ...prev, liked: !prev.liked, likes: prev.liked ? prev.likes - 1 : prev.likes + 1 }
        : prev
    );
  };

  const handleSelectPost = (post: Post) => {
    const latest = posts.find((p) => p.id === post.id) ?? post;
    setSelectedPost(latest);
  };

  const handleCloseModal = () => setSelectedPost(null);

  const handleNavigate = (view: "home" | "profile") => {
    setCurrentView(view);
    setSelectedPost(null);
  };

  return (
    <div className="app">
      <Header onNavigate={handleNavigate} />
      <Sidebar currentView={currentView} onNavigate={handleNavigate} />

      <main className="app__main">
        {currentView === "home" ? (
          <>
            <Stories stories={stories} />
            <Feed
              posts={posts}
              loading={loading}
              onSelectPost={handleSelectPost}
              onLike={handleLike}
            />
          </>
        ) : (
          <ProfileView posts={posts} onSelectPost={handleSelectPost} />
        )}
      </main>

      <PostModal
        post={selectedPost}
        onClose={handleCloseModal}
        onLike={handleLike}
      />
    </div>
  );
}

export default App;

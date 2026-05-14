export interface Post {
  id: string;
  imageUrl: string;
  username: string;
  avatarUrl: string;
  caption: string;
  likes: number;
  liked: boolean;
  comments: Comment[];
  date: string;
}

export interface Comment {
  id: number;
  user: string;
  text: string;
}

export interface Story {
  id: number;
  username: string;
  imageUrl: string;
}

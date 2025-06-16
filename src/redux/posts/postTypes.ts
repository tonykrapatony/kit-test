export interface Post {
  id: string;
  title: string;
  text: string;
  date: string;
}

export interface PostsState {
  items: Post[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
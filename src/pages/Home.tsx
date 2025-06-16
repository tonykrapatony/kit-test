import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import { fetchPosts } from '../redux/posts/postsThunks';
import PostList from '../components/PostList';


const Home = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return <PostList />;
};

export default Home;

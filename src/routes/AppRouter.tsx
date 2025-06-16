import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import PostPage from '../pages/PostPage';
import CreatePostPage from '../pages/CreatePostPage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/post/:id" element={<PostPage />} />
      <Route path="/create" element={<CreatePostPage />} />
      <Route path="/edit/:id" element={<CreatePostPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;

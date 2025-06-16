
import { useParams } from 'react-router-dom';
import PostItem from '../components/PostItem';

const PostPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) return <p>Invalid post ID.</p>;

  return <PostItem postId={id} />;
};

export default PostPage;

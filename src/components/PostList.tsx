import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deletePost } from '../redux/posts/postsThunks';
import type { RootState, AppDispatch } from '../redux/store';

const PostList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: posts, status, error } = useSelector((state: RootState) => state.posts);

  if (status === 'loading') return <p>Loading posts...</p>;
  if (status === 'failed') return <p className="text-red-500">Error: {error}</p>;
  if (posts.length === 0) return <p>No posts found.</p>;

  const handleDelete = (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (confirmDelete) {
      dispatch(deletePost(id));
    }
  };

  return (
    <div className="grid gap-4">
      {posts.map((post) => (
        <div key={post.id} className="border p-4 rounded shadow">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p>{post.text.slice(0, 100)}...</p>
          <p className="text-sm text-gray-600">{new Date(post.date).toLocaleString()}</p>
          <div className="flex gap-4 mt-2">
            <Link to={`/post/${post.id}`} className="text-blue-600 hover:underline">
              Read more
            </Link>
            <button
              onClick={() => handleDelete(post.id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;

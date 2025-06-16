import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { AppDispatch, RootState } from '../redux/store';
import { deletePost, updatePost } from '../redux/posts/postsThunks';

type Props = {
  postId: string;
};
const PostItem = ({ postId }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { items: posts, status } = useSelector((state: RootState) => state.posts);
  const post = posts.find((p) => p.id === postId);

  const [isEditing, setIsEditing] = useState(false);

  const onSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get('title')?.toString().trim() || '';
    const content = formData.get('content')?.toString().trim() || '';

    if (!title || !content) {
      alert('Title and content cannot be empty');
      return;
    }

    if (!post) {
      alert('Post not found.');
      return;
    }

    dispatch(updatePost({ id: post.id, title, text: content, date: post.date }));
    setIsEditing(false);
  };

  const onCancel = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (!post) {
      alert('Post not found.');
      return;
    }
    dispatch(deletePost(post.id));
    navigate('/');
  };

  if (status === 'loading') return <p>Loading...</p>;
  if (!post) return <p className="text-red-500">Post not found.</p>;

  return (
    <article className="max-w-3xl mx-auto p-4">
      {isEditing ? (
        <form onSubmit={onSave}>
          <input
            name="title"
            defaultValue={post.title}
            className="border p-2 w-full mb-2"
            placeholder="Post title"
          />
          <textarea
            name="content"
            defaultValue={post.text}
            className="border p-2 w-full h-48 mb-2"
            placeholder="Post content"
          />
          <div>
            <button type="submit" className="mr-2 bg-blue-500 text-white px-4 py-2 rounded">
              Save
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <p className="mb-4 whitespace-pre-wrap">{post.text}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-400 px-4 py-2 rounded"
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded ml-2"
          >
            Delete
          </button>
        </>
      )}
    </article>
  );
};

export default PostItem;

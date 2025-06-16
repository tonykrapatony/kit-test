import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from '../redux/posts/postsThunks';
import type { AppDispatch } from '../redux/store';

const PostForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const title = formData.get('title')?.toString().trim() || '';
    const text = formData.get('text')?.toString().trim() || '';

    if (!title || !text) {
      setError('Title and content cannot be empty');
      return;
    }

    try {
      setLoading(true);
      const res = await dispatch(addPost({ title, text, date: new Date().toISOString() })).unwrap();
      console.log(res);
      form.reset();
    } catch (err) {
      console.error('Failed to add post:', err);
      setError('Failed to add post');
    } finally {
      setLoading(false);
    }
  };


  return (
    <form onSubmit={onSubmit} className="pt-10 max-w-3xl mx-auto">
      <h1 className="font-bold text-3xl text-gray-900 mb-6">Add post</h1>

      {error && <p className="mb-4 text-red-600">{error}</p>}

      <div className="mb-4">
        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">
          Post title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
          focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Title"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900">
          Post text
        </label>
        <textarea
          id="text"
          name="text"
          className="min-h-32 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
          focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Text..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
        focus:ring-blue-300 font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center"
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default PostForm;

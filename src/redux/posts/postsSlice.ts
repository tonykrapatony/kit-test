import { createSlice } from '@reduxjs/toolkit';
import { fetchPosts, addPost, updatePost, deletePost } from './postsThunks';
import type { PostsState } from './postTypes';

const initialState: PostsState = {
  items: [],
  status: 'idle',
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch posts';
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.items.findIndex((post) => post.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter((post) => post.id !== action.payload);
      });
  },
});

export default postsSlice.reducer;

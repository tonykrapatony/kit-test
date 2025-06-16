import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import type { Post } from './postTypes';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const querySnapshot = await getDocs(collection(db, 'posts'));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Post[];
});

export const addPost = createAsyncThunk(
  'posts/addPost',
  async (post: Omit<Post, 'id'>) => {
    const docRef = await addDoc(collection(db, 'posts'), post);
    return { id: docRef.id, ...post };
  }
);

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async (post: Post) => {
    const postRef = doc(db, 'posts', post.id);
    await updateDoc(postRef, { title: post.title, text: post.text });
    return post;
  }
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (postId: string) => {
    await deleteDoc(doc(db, 'posts', postId));
    return postId;
  }
);

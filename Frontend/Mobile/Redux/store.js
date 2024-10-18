// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import dragAndDropReducer from './Slice/DragAndDrop'; // Renamed for clarity
import taskSlice from './Slice/taskSlice';

const store = configureStore({
  reducer: {
    scrolling: dragAndDropReducer,
    tasks: taskSlice
  },
});

export default store;

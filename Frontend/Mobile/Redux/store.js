// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import dragAndDropReducer from './Slice/DragAndDrop'; // Renamed for clarity

const store = configureStore({
  reducer: {
    scrolling: dragAndDropReducer,
    // Add other reducers here
  },
  // middleware and devTools are included by default
});

export default store;

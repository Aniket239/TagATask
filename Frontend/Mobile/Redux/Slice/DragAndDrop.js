// src/Redux/Slice/DragAndDrop.js
import { createSlice } from "@reduxjs/toolkit";

const DragAndDrop = createSlice({
    name: "scrolling",
    initialState: { value: true }, // Changed to an object
    reducers: { // Correct key
        stopScrolling: (state) => { state.value = false },
        startScrolling: (state) => { state.value = true }
    }
});

export const { startScrolling, stopScrolling } = DragAndDrop.actions;

export default DragAndDrop.reducer;

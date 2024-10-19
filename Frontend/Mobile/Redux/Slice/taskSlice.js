import { createSlice } from "@reduxjs/toolkit";
import tasks from "../Database/tasks";

const taskSlice = createSlice({
    name: "tasks",
    initialState: tasks,
    reducers: {
        addTask: (state, action) => {
            console.log("=========================================================");
            console.log(action.payload);
            console.log("=========================================================");
            state.push(action.payload);
        },
        // updateTask: (state)
    }
});
export const{addTask} = taskSlice.actions;
export default taskSlice.reducer;
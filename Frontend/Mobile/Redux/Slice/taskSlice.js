import { createSlice } from "@reduxjs/toolkit";
import tasks from "../Database/tasks";

const taskSlice = createSlice({
    name: "tasks",
    initialState: tasks,
    reducers: {
        reorderTask:(state,action) => {
            console.log("=========================================================");
            console.log(action.payload);
            console.log("=========================================================");
            return action.payload; // Return the new array to replace the state
        },
        addTask: (state, action) => {
            console.log("=========================================================");
            console.log(action.payload);
            console.log("=========================================================");
            state.push(action.payload);
        },

        // updateTask: (state)
    }
});
export const{reorderTask,addTask} = taskSlice.actions;
export default taskSlice.reducer;
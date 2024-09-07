import React, { useState } from "react";
import { View, ScrollView, Dimensions } from "react-native";
import ToDo from "../components/ToDo";
import ToBeApproved from "../components/ToBeApproved";
import Done from "../components/Done";
import ToolNavbar from "../components/ToolNavbar";

// Define the Task interface
interface Task {
    id: string; // Unique identifier for each task
    title: string;
    dueDate: Date;
    dateSet: boolean;
    tag: string[];
    recurrence: string | null;
    comment: string;
    fileUri?: string;
    filenames: string[];
    fileDatas: { name: string, data: string }[];
    status: "todo" | "tobeapproved" | "done"; // Task status
}

const { width } = Dimensions.get("window");

const Home = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    // Function to add or update a task
    const handleSaveTask = (newTask: Task) => {
        setTasks(prevTasks => {
            const existingTaskIndex = prevTasks.findIndex(task => task.id === newTask.id);
            if (existingTaskIndex !== -1) {
                // Update existing task
                const updatedTasks = [...prevTasks];
                updatedTasks[existingTaskIndex] = newTask;
                return updatedTasks;
            } else {
                // Add new task
                return [...prevTasks, { ...newTask, id: `${Date.now()}`, status: "todo" }];
            }
        });
    };

    // Function to update task status
    const updateTaskStatus = (taskId: string, newStatus: "tobeapproved" | "done") => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId ? { ...task, status: newStatus } : task
            )
        );
    };

    // Function to delete a task
    const deleteTask = (taskId: string) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    };

    return (
        <>
            <ToolNavbar />
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyboardDismissMode='on-drag'
                style={{ flex: 1 }}
            >
                <View style={{ width: width, justifyContent: 'flex-start', alignItems: 'center' }}>
                    <ToDo 
                        tasks={tasks.filter(task => task.status === "todo")}
                        onSaveTask={handleSaveTask}
                        onUpdateTaskStatus={updateTaskStatus}
                        onDeleteTask={deleteTask}
                    />
                </View>
                <View style={{ width: width, justifyContent: 'flex-start', alignItems: 'center' }}>
                    <ToBeApproved 
                        tasks={tasks.filter(task => task.status === "tobeapproved")}
                        onSaveTask={handleSaveTask}
                        onUpdateTaskStatus={updateTaskStatus}
                        onDeleteTask={deleteTask}
                    />
                </View>
                <View style={{ width: width, justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Done 
                        tasks={tasks.filter(task => task.status === "done")}
                        onSaveTask={handleSaveTask}
                        onUpdateTaskStatus={updateTaskStatus}
                        onDeleteTask={deleteTask}
                    />
                </View>
            </ScrollView>
        </>
    );
};

export default Home;

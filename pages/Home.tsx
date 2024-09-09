import React, { useState } from "react";
import { View, ScrollView, Dimensions } from "react-native";
import ToDo from "../components/ToDo";
import ToBeApproved from "../components/ToBeApproved";
import Done from "../components/Done";
import ToolNavbar from "../components/ToolNavbar";

const { width } = Dimensions.get("window");

interface Task {
    id: string;
    title: string;
    dueDate: Date;
    tag: string[];
    recurrence: string | null;
    comment: string;
    fileUri?: string;
    filenames: string[];
    fileDatas: { name: string, data: string }[];
    dateSet: boolean;
    status: "todo" | "tobeapproved" | "done";
}

const Home = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const handleTaskCreation = (title: string) => {
        if (title.trim()) {
            const newTask: Task = {
                id: Math.random().toString(36).substr(2, 9),
                status: "todo",
                title: title.trim(),
                dueDate: new Date(),
                dateSet: false,
                tag: [],
                recurrence: null,
                comment: '',
                filenames: [],
                fileDatas: []
            };
            setTasks([...tasks, newTask]);
        }
    };

    const handleTaskUpdate = (updatedTask: Task) => {
        setTasks(tasks.map(t => (t.id === updatedTask.id ? updatedTask : t)));
    };

    const handleTaskStatusChange = (id: string, newStatus: "todo" | "tobeapproved" | "done") => {        
        setTasks(tasks.map(t => (t.id === id ? { ...t, status: newStatus } : t)));
    };

    const handleTaskDelete = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId));
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
                        tasks={tasks.filter(t => t.status === "todo")}
                        onCreateTask={handleTaskCreation}
                        onUpdateTask={handleTaskUpdate}
                        onDeleteTask={handleTaskDelete}
                        onStatusChange={(id: string) => handleTaskStatusChange(id, "tobeapproved")}
                    />
                </View>
                <View style={{ width: width, justifyContent: 'flex-start', alignItems: 'center' }}>
                    <ToBeApproved
                        tasks={tasks.filter(t => t.status === "tobeapproved")}
                        onStatusChange={(id: string) => handleTaskStatusChange(id, "done")}
                        onDeleteTask={handleTaskDelete}
                    />
                </View>
                <View style={{ width: width, justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Done
                        tasks={tasks.filter(t => t.status === "done")}
                        onDeleteTask={handleTaskDelete}
                    />
                </View>
            </ScrollView>
        </>
    );
};

export default Home;

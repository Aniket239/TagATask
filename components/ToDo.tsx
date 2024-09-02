import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import NewTask from "./NewTask";

interface Task {
    title: string;
    date: Date;  // Use Date object for consistency
    tag: string[];
    recurrence: string | null;
    comment: string;
}

const ToDo = () => {
    const [tasks, setTasks] = React.useState<Task[]>([]);
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
    const [selectedTask, setSelectedTask] = React.useState<Task | null>(null);

    const openModal = (task?: Task) => {
        setSelectedTask(task || null);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const saveTask = (task: Task) => {
        if (selectedTask) {
            setTasks(tasks.map(t => (t === selectedTask ? task : t)));
        } else {
            setTasks([...tasks, task]);
        }
    };

    return (
        <View style={styles.toDoContainer}>
            <Text style={styles.headerText}>To-Do</Text>
            {tasks.map((task, index) => (
                task.title ? (
                    <Pressable key={index} onPress={() => openModal(task)} style={styles.task}>
                        <Text style={styles.taskText}>{task.title}</Text>
                    </Pressable>
                ) : null
            ))}
            <Pressable onPress={() => openModal()} style={styles.task}>
                <Text style={styles.taskText}>+ Add New Task</Text>
            </Pressable>
            <NewTask
                isOpenTask={isModalOpen}
                onClose={closeModal}
                onSave={saveTask}
                taskData={selectedTask}
            />
        </View>
    );
};

export default ToDo;

const styles = StyleSheet.create({
    toDoContainer: {
        backgroundColor: "#f0f0f0", // Soft light gray for better contrast
        width: "90%",
        height: "97%",
        justifyContent: "flex-start",
        alignItems: "center",
        borderRadius: 15, // Slightly more rounded corners for a modern look
        paddingTop: 25, // Extra padding for a more spacious layout
        paddingHorizontal: 20,
        shadowColor: "#000", // Add shadow for a subtle 3D effect
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // Elevation for Android shadow
    },
    headerText: {
        color: "#333", // Darker gray for better readability
        fontSize: 26, // Slightly larger font for emphasis
        marginBottom: 25,
        fontWeight: "bold",
        textAlign: "left", // Center align the header text
        width: "100%"
    },
    task: {
        width: "100%", // Full width for better alignment
        paddingVertical: 15, // Vertical padding for touchable area
        paddingHorizontal: 20, // Horizontal padding for content spacing
        backgroundColor: "#ffffff", // White background for task item
        borderRadius: 10, // Rounded corners for task item
        marginBottom: 15, // Spacing between tasks
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        color: "black",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    taskText: {
        fontSize: 18, // Slightly larger task title font
        color: "black", // Darker text for better contrast
    },
});

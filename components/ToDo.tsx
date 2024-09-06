import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import NewTask from "./NewTask";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import ToBeApproved from "./ToBeApproved";

interface Task {
    title: string;
    dueDate: Date;  // Use Date object for consistency
    tag: string[];
    recurrence: string | null;
    comment: string;
    fileUri?: string; // Add optional file URI
    filenames: string[];  // Array of file names
    fileDatas: { name: string, data: string }[];  // Array of objects containing file name and base64 data
    dateSet: boolean;
}

const ToDo = () => {
    const [tasks, setTasks] = React.useState<Task[]>([]);
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
    const [selectedTask, setSelectedTask] = React.useState<Task | null>(null);
    const [taskName, setTaskName] = React.useState('');

    const openModal = (task?: Task) => {
        setSelectedTask(task || null);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTask(null);
    };

    const saveTask = (task: Task) => {
        if (selectedTask) {
            // Update existing task
            setTasks(tasks.map(t => (t === selectedTask ? task : t)));
        } else {
            // Add new task
            setTasks([...tasks, task]);
        }
        setTaskName('');
        closeModal();
    };

    const handleTaskCreation = () => {
        if (taskName.trim()) {
            const newTask: Task = {
                title: taskName.trim(),
                dueDate: new Date(),
                dateSet: false,
                tag: [],
                recurrence: null,
                comment: '',
                fileUri: undefined,
                filenames: [],
                fileDatas: []
            };
            setTasks([...tasks, newTask]);
            setTaskName('');
        }
    };

    return (
        <View style={styles.toDoContainer}>
            <Text style={styles.headerText}>To-Do</Text>
            {tasks.map((task, index) => (
                task.title && (
                    <View key={index} style={styles.task}>
                        <Pressable onPress={() => { ToBeApproved }} style={styles.checkbox}>
                            <MaterialIcon name="check-box-outline-blank" size={30} color="#5f6368" />
                        </Pressable>
                        <Pressable onPress={() => openModal(task)} style={styles.taskData}>
                            <Text style={styles.taskText}>{task.title}</Text>
                            {task.dateSet && (
                                <Text style={styles.taskText}>{task.dueDate.toLocaleDateString()}</Text>
                            )}
                        </Pressable>
                    </View>
                )
            ))}
            <TextInput
                editable
                multiline={false}
                numberOfLines={1}
                value={taskName}
                onChangeText={setTaskName}
                onBlur={handleTaskCreation}
                placeholder="+ Add New Task"
                placeholderTextColor="black"
                style={styles.taskInput}
            />
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
        backgroundColor: "#f0f0f0",
        width: "90%",
        height: "97%",
        justifyContent: "flex-start",
        alignItems: "center",
        borderRadius: 15,
        paddingTop: 25,
        paddingHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    headerText: {
        color: "#333",
        fontSize: 26,
        marginBottom: 25,
        fontWeight: "bold",
        textAlign: "left",
        width: "100%"
    },
    task: {
        width: "100%",
        paddingVertical: 15,
        paddingHorizontal: "2%",
        backgroundColor: "#ffffff",
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        color: "black",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    checkbox: {
        width: "10%"
    },
    taskData: {
        width: "89%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: "2%"
    },
    taskText: {
        fontSize: 18,
        color: "black",
    },
    taskInput: {
        width: "100%",
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        color: "black",
        fontSize: 18,
    },
});

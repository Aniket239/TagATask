import React from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import NewTask from "./NewTask";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

interface Task {
    id: string;
    title: string;
    dueDate: Date;  // Use Date object for consistency
    tag: string[];
    recurrence: string | null;
    comment: string;
    fileUri?: string; // Add optional file URI
    filenames: string[];  // Array of file names
    fileDatas: { name: string, data: string }[];  // Array of objects containing file name and base64 data
    dateSet: boolean;
    status: "todo" | "tobeapproved" | "done";
}

const ToDo = () => {
    const [tasks, setTasks] = React.useState<Task[]>([]);
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
    const [selectedTask, setSelectedTask] = React.useState<Task | null>(null);
    const [taskName, setTaskName] = React.useState('');

    const openModal = (task?: Task) => {
        console.log(task);
        setSelectedTask(task || null);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTask(null);
    };

    const saveTask = (task: Task) => {
        console.log(task);
        if (selectedTask) {
            setTasks(tasks.map(t => (t === selectedTask ? task : t)));
        } else {
            setTasks([...tasks, task]);
        }
        setTaskName('');
        closeModal();
    };

    const handleTaskCreation = () => {
        if (taskName.trim()) {
            const newTask: Task = {
                id: Math.random().toString(36).substr(2, 9),
                status: "todo",
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
            console.log(newTask);
            
            setTasks([...tasks, newTask]);
            setTaskName('');
        }
    };

    const handleCheckboxPress = (id: string) => {
        onUpdateTaskStatus(id);
    };

    return (
        <View style={styles.toDoContainer}>
            <Text style={styles.headerText}>To-Do</Text>
            {tasks.length === 0 ? (
                <Text style={styles.noTaskText}>No tasks available</Text>
            ) : (
                <FlatList
                    data={tasks}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.task}>
                            <Pressable onPress={() => handleCheckboxPress(item.id)} style={styles.checkbox}>
                                <MaterialIcon
                                    name={item.status === "done" ? "check-box" : "check-box-outline-blank"}
                                    size={25}
                                    color={item.status === "done" ? "green" : "gray"}
                                />
                            </Pressable>
                            <Pressable style={styles.taskData} onPress={() => openModal(item)}>
                                <Text style={styles.taskText}>{item.title}</Text>
                                {item.dateSet && (
                                    <Text style={styles.taskDate}>{item.dueDate.toLocaleDateString()}</Text>
                                )}
                            </Pressable>
                        </View>
                    )}
                />
            )}
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

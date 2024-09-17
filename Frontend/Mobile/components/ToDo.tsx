import React, { useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import UpdateTask from "./UpdateTask";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-date-picker';



interface Task {
    id: string;
    title: string;
    dueDate: Date;  // Use Date object for consistency
    label: string[];
    recurrence: string | null;
    comment: string[];  // Changed to an array of strings
    fileUri?: string; // Add optional file URI
    filenames: string[];  // Array of file names
    fileDatas: { name: string, data: string }[];  // Array of objects containing file name and base64 data
    dateSet: boolean;
    status: "todo" | "tobeapproved" | "done";
}

interface ToDoProps {
    tasks: Task[];
    onCreateTask: (title: string) => void;
    onUpdateTask: (task: Task) => void;
    onDeleteTask: (taskId: string) => void;
    onStatusChange: (id: string) => void;  // New prop to change task status
}

const ToDo: React.FC<ToDoProps> = ({ tasks, onCreateTask, onUpdateTask, onDeleteTask, onStatusChange }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [taskName, setTaskName] = useState('');
    const [isEditDate, setIsEditDate] = useState(false);
    const [editDate, setEditDate] = useState(false);
    const [isDueDatePickerOpen, setIsDueDatePickerOpen] = useState(false);
    const [isDueTimePickerOpen, setIsDueTimePickerOpen] = useState(false);
    const [dueDate, setDueDate] = useState<Date>(tasks?.dueDate ? new Date(tasks.dueDate) : new Date());
    const [dateSet, setDateSet] = useState<boolean>(tasks?.dateSet || false);


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
            onUpdateTask({ ...task, id: selectedTask.id });
        } else {
            onCreateTask(task.title);
        }
        setTaskName('');
        closeModal();
    };

    const handleTaskCreation = () => {
        if (taskName.trim()) {
            onCreateTask(taskName.trim());
            setTaskName('');
        }
    };

    const handleCheckboxPress = (id: string) => {
        onStatusChange(id);  // Call status change to move task to "tobeapproved"
    };

    const openEditDate = () => {
        setIsEditDate(true);
    }
    const closeEditDate = () => {
        setIsEditDate(false);
    }

    return (
        <View style={styles.toDoContainer}>
            <Pressable>
                <Text style={styles.headerText}>To-Do</Text>
                {tasks.length === 0 ? (
                    <></>
                ) : (
                    <FlatList
                        data={tasks}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.task}>
                                <Pressable onPress={() => handleCheckboxPress(item.id)} style={styles.checkbox}>
                                    <MaterialIcon
                                        name="check-box-outline-blank"
                                        size={25}
                                        color="gray"
                                    />
                                </Pressable>
                                <Pressable style={styles.taskData} onPress={() => openModal(item)}>
                                    <Text style={styles.taskText}>{item.title}</Text>
                                    <View style={styles.taskIcons}>
                                        {isEditDate &&
                                            (<Modal
                                                animationType="fade"
                                                transparent={true}
                                                visible={isEditDate}
                                                onRequestClose={closeEditDate}
                                            >
                                                <Pressable style={styles.dateContainer} onPress={closeEditDate}>
                                                    {/* Due Date Picker */}
                                                    <DatePicker
                                                        modal
                                                        theme="light"
                                                        mode="date"
                                                        minimumDate={new Date()}  // Set today's date as the minimum
                                                        open={isDueDatePickerOpen}
                                                        date={dueDate}
                                                        onConfirm={(date) => {
                                                            setIsDueDatePickerOpen(false);
                                                            setDueDate(date);
                                                            setDateSet(true);
                                                        }}
                                                        onCancel={() => {
                                                            setIsDueDatePickerOpen(false);
                                                        }
                                                        }
                                                    />

                                                    {/* Due Time Picker */}
                                                    <DatePicker
                                                        modal
                                                        theme="light"
                                                        mode="time"
                                                        open={isDueTimePickerOpen}
                                                        date={dueDate}
                                                        onConfirm={(time) => {
                                                            setIsDueTimePickerOpen(false);
                                                            setDueDate(time);
                                                            setDateSet(true);
                                                        }}
                                                        onCancel={() => {
                                                            setIsDueTimePickerOpen(false)
                                                        }}
                                                    />
                                                    {dateSet ? <Pressable onPress={() => setDateSet(false)}>
                                                        <MaterialIcon name="restart-alt" size={30} color={'#5f6368'} />
                                                    </Pressable> : <></>}
                                                </Pressable>
                                            </Modal>)}
                                        <Pressable onPress={openEditDate}>
                                            <MaterialIcon name="event" size={30} color={item.dateSet ? "black" : "grey"} />
                                        </Pressable>
                                        <Pressable>
                                            <MaterialIcon name="label-outline" size={30} color={item.label.length > 0 ? "black" : "grey"} />
                                        </Pressable>
                                        <Pressable onPress={() => openModal(item)}>
                                            <MaterialIcon name="edit" size={25} color="grey" />
                                        </Pressable>
                                    </View>
                                </Pressable>
                            </View>
                        )}
                    />
                )}
                <TextInput
                    editable
                    multiline
                    returnKeyType="next"
                    value={taskName}
                    onChangeText={setTaskName}
                    onBlur={handleTaskCreation}
                    placeholder="+ Add New Task"
                    placeholderTextColor="black"
                    style={styles.taskInput}
                />
                <UpdateTask
                    isOpenTask={isModalOpen}
                    onClose={closeModal}
                    onSave={saveTask}
                    taskData={selectedTask}
                />
            </Pressable>
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
        paddingVertical: 10,
        paddingLeft: "2%",
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
        justifyContent: "flex-start",
        alignItems: "center"
    },
    checkbox: {
        width: "7%",
        marginRight: "2%"
    },
    taskData: {
        width: "89%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: "2%",
    },
    taskText: {
        fontSize: 18,
        width: "65%",
        color: "black",
    },
    taskIcons: {
        width: "32%",
        flexDirection: "row",
        justifyContent: "space-between",
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

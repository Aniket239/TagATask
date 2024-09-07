import React from "react";
import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

interface Task {
    id: string;
    title: string;
    dueDate: Date;
    dateSet: boolean;
    tag: string[];
    recurrence: string | null;
    comment: string;
    fileUri?: string;
    filenames: string[];
    fileDatas: { name: string, data: string }[];
    status: "todo" | "tobeapproved" | "done";
}

interface ToBeApprovedProps {
    tasks: Task[];
    onSaveTask: (task: Task) => void;
    onUpdateTaskStatus: (taskId: string, newStatus: "done") => void;
    onDeleteTask: (taskId: string) => void;
}

const ToBeApproved: React.FC<ToBeApprovedProps> = ({ tasks, onSaveTask, onUpdateTaskStatus, onDeleteTask }) => {

    const handleApprove = (taskId: string) => {
        onUpdateTaskStatus(taskId, "done");
    };

    return (
        <View style={styles.toBeApprovedContainer}>
            <Text style={styles.headerText}>To Be Approved</Text>
            {tasks.length === 0 ? (
                <Text style={styles.noTaskText}>No tasks pending approval</Text>
            ) : (
                <FlatList
                    data={tasks}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.task}>
                            <Pressable onPress={() => handleApprove(item.id)} style={styles.checkbox}>
                                <MaterialIcon 
                                    name="check-circle-outline" 
                                    size={25} 
                                    color="orange" 
                                />
                            </Pressable>
                            <View style={styles.taskData}>
                                <Text style={styles.taskText}>{item.title}</Text>
                                {item.dateSet && (
                                    <Text style={styles.taskDate}>{item.dueDate.toLocaleDateString()}</Text>
                                )}
                            </View>
                        </View>
                    )}
                />
            )}
        </View>
    );
};

export default ToBeApproved;

const styles = StyleSheet.create({
    toBeApprovedContainer: {
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
    noTaskText: {
        fontSize: 18,
        color: "#666",
        marginTop: 20,
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
        justifyContent: "space-between",
        alignItems: "center"
    },
    checkbox: {
        width: "10%",
    },
    taskData: {
        width: "90%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: "2%"
    },
    taskText: {
        fontSize: 18,
        color: "black",
    },
    taskDate: {
        fontSize: 14,
        color: "#555",
    },
});

import React from "react";
import { View, FlatList, Pressable, Text, StyleSheet } from "react-native";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

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

interface ToBeApprovedProps {
    tasks: Task[];
    onStatusChange: (id: string) => void;  // Change status to "done"
    onDeleteTask: (taskId: string) => void;
}

const ToBeApproved: React.FC<ToBeApprovedProps> = ({ tasks, onStatusChange, onDeleteTask }) => {
    const handleCheckboxPress = (id: string) => {
        onStatusChange(id);  // Move task to "done"
    };

    return (
        <View style={styles.toBeApprovedContainer}>
            <Text style={styles.headerText}>To Be Approved</Text>
            {tasks.length === 0 ? (
                <Text style={styles.noTaskText}>No tasks to be approved</Text>
            ) : (
                <FlatList
                    data={tasks}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.task}>
                            <Pressable onPress={() => handleCheckboxPress(item.id)} style={styles.checkbox}>
                                <MaterialIcon
                                    name="check-circle"
                                    size={25}
                                    color="gray"
                                />
                            </Pressable>
                            <Text style={styles.taskText}>{item.title}</Text>
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
        width: "100%",
    },
    task: {
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
        flexDirection: "row",
        justifyContent: "space-between",
    },
    taskText: {
        fontSize: 18,
        color: "black",
    },
    checkbox: {
        width: "10%",
    },
    noTaskText: {
        fontSize: 16,
        color: "gray",
    },
});

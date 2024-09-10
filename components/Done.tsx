import React from "react";
import { View, FlatList, Text, StyleSheet, Pressable } from "react-native";
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

interface DoneProps {
    tasks: Task[];
}

const Done: React.FC<DoneProps> = ({ tasks }) => {
    console.log('====================================');
    console.log(tasks);
    console.log('====================================');

    return (
        <View style={styles.doneContainer}>
            <Text style={styles.headerText}>Done</Text>
            {tasks.length === 0 ? (
                <Text style={styles.noTaskText}>No tasks done yet</Text>
            ) : (
                <FlatList
                    data={tasks}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.task}>
                            <Text style={styles.taskText}>{item.title}</Text>
                            {item.dateSet && (
                                <Text style={styles.taskText}>{item.dueDate.toLocaleDateString()}</Text>
                            )}
                        </View>
                    )}
                />

            )}
        </View>
    );
};

export default Done;

const styles = StyleSheet.create({
    doneContainer: {
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
        alignItems: "center",
    },
    taskText: {
        width: "100%",
        fontSize: 18,
        color: "black",
        textDecorationLine: "line-through"
    },
    noTaskText: {
        fontSize: 16,
        color: "gray",
    },
    deleteButton: {
        paddingHorizontal: 10,
    },
});

import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from "react-redux";

const Done = () => {
    const tasks = useSelector((state) => state.tasks);
    const doneTasks = tasks.filter(task => task.status === "done");

    const renderTask = ({ item }) => (
        <View style={styles.taskItem}>
            <View style={styles.taskTextContainer}>
                <Text style={styles.taskText}>{item.title}</Text>
            </View>
            <View style={styles.iconContainer}>
                <MaterialIcon name="event" size={25} color="grey" style={styles.icon} />
                <MaterialIcon name="label-outline" size={25} color="grey" style={styles.icon} />
            </View>
        </View>
    );

    return (
        <View style={styles.doneContainer}>
            <Text style={styles.headerText}>Done</Text>
            {doneTasks.length > 0 ? (
                <FlatList
                    data={doneTasks}
                    renderItem={renderTask}
                    keyExtractor={(item) => item.id.toString()} // Ensure each item has a unique key
                    contentContainerStyle={styles.taskList}
                />
            ) : (
                <View style={styles.noTaskContainer}>
                    <Text style={styles.noTaskText}>No tasks completed yet!</Text>
                </View>
            )}
        </View>
    );
};

export default Done;

const styles = StyleSheet.create({
    doneContainer: {
        backgroundColor: "#f0f0f0",
        width: "98%",
        height: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    headerText: {
        color: "#333",
        fontSize: 24,
        marginVertical: 10,
        fontWeight: "bold",
        textAlign: "center",
        width: "100%",
    },
    taskList: {
        width: "100%",
        flex: 1,
        backgroundColor: "white",
        borderRadius: 8,
        borderColor: "#e0e0e0", // Lighter border color for subtlety
        borderWidth: 1,
        elevation: 3,
        // Shadow for iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    taskItem: {
        width: "100%",
        paddingVertical: "2%",
        paddingHorizontal: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomColor: "#f0f0f0", // Lighter border for separation
        borderBottomWidth: 1
    },
    taskTextContainer: {
        flex: 1,
        marginRight: 10,
    },
    taskText: {
        fontSize: 16,
        color: "#333",
    },
    iconContainer: {
        flexDirection: "row",
    },
    icon: {
        marginLeft: 10,
    },
    noTaskContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 50,
    },
    noTaskText: {
        fontSize: 16,
        color: "gray",
    },
});

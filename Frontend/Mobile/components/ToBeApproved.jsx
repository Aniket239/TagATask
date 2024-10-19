// /components/ToBeApproved.js

import React from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import Accordion from "./Accordion"; // Adjust the path as necessary

const ToBeApproved = () => {
    const tasks = useSelector((state) => state.tasks);

    // Filter tasks into Pending and Completed
    const pendingTasks = tasks.filter(task => task.status=='forExecution');
    const completedTasks = tasks.filter(task => task.status=="forApproval");

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Follow Up</Text>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Accordion title="For Execute" tasks={pendingTasks} />
                <Accordion title="For Approval" tasks={completedTasks} />
            </ScrollView>
        </View>
    );
};

export default ToBeApproved;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
        backgroundColor: "#f2f2f2",
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "600",
        color: "#000",
        marginVertical: 10,
        textAlign: "center",
    },
    scrollViewContent: {
        paddingBottom: 20,
    },
});

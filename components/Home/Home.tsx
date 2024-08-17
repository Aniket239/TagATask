import React, { useState } from "react";
import NewTask from "./NewTask";
import { View, Text, StyleSheet, FlatList } from "react-native";

interface Task {
    title: string;
    task: string;
}

const Home = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const addTask = (task: Task) => {
        setTasks([...tasks, task]);
    };

    const renderTaskCard = ({ item }: { item: Task }) => (
        <View style={styles.taskCard}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text style={styles.taskDescription}>{item.task}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.cards}>
                <FlatList
                    data={tasks}
                    renderItem={renderTaskCard}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.taskList}
                />
            </View>
            <View style={styles.newTaskButtonContainer}>
                <NewTask addTask={addTask} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 20,
        width: '100%',
    },
    cards:{
        flex: 1,
        padding: 20,
        width: '100%',
        flexDirection: 'row'
    },
    innerText: {
        color: 'black',
        fontSize: 20,
        marginBottom: 20,
    },
    taskList: {
        flexGrow: 1,
    },
    taskCard: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        elevation: 2, // For Android shadow
        shadowColor: '#000', // For iOS shadow
        shadowOffset: { width: 0, height: 2 }, // For iOS shadow
        shadowOpacity: 0.2, // For iOS shadow
        shadowRadius: 4, // For iOS shadow
    },
    taskTitle: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    taskDescription: {
        color: 'black',
        fontSize: 16,
    },
    newTaskButtonContainer: {
        position: 'absolute',
        bottom: 40,
        right: 40,
    },
});

export default Home;

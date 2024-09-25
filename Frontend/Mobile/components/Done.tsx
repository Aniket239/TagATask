import React from "react";
import { View, FlatList, Text, StyleSheet, Pressable } from "react-native";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const Done = () => {
    return (
        <View style={styles.doneContainer}>
            <Text style={styles.headerText}>Done</Text>
        </View>
    );
};

export default Done;

const styles = StyleSheet.create({
    doneContainer: {
        width: "100%",
        height: "100%",
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

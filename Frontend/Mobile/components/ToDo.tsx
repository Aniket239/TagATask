import React from "react";
import { Text,StyleSheet,View } from "react-native";

const ToDo = () => {

    return (
        <>
        <View style={styles.todoContainer}>
            <Text style={styles.headerText}>To-Do</Text>
            <View>
                
            </View>
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    todoContainer: {
        width: "100%",
        height: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 25,
        paddingHorizontal: 20,
    },
    headerText: {
        color: "#333",
        fontSize: 26,
        marginBottom: 25,
        fontWeight: "bold",
        textAlign: "left",
        width: "100%",
    },
    execute:{
        backgroundColor: "#f0f0f0",
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    }
});


export default ToDo;
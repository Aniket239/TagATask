import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import NewTask from "./NewTask";

const ToDo = () => {

    const [pressed,setPressed] = React.useState("false");

    const editTask = () =>{

        setPressed("true");

    }
    return (
        <>
        <Pressable onLongPress={editTask} style={styles.pressableContainer}>
            <Text style={styles.headerText}>To-Do</Text>
            {pressed == "true"?<NewTask isEditable={true} />:<></>}
        </Pressable>
        
        </>

    );
}

export default ToDo;

const styles = StyleSheet.create({
    pressableContainer: {
        backgroundColor: "lightgray",
        width: "90%",
        height: "97%",
        justifyContent: "flex-start",
        alignItems: "center",
        borderRadius: 10,
        paddingTop: 20,
        paddingHorizontal: 15,
    },
    headerText: {
        color: "black",
        fontSize: 24,
        marginBottom: 20,
        fontWeight: "bold",
    },
});
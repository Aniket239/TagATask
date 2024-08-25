import React from "react";
import { View, Text } from "react-native";

const ToDo = () =>{
    return(
        <View style={{
            backgroundColor: "lightgray",
            width: "90%",
            height: "97%",
            justifyContent: "flex-start",
            alignItems: "center",
            borderRadius: 10,
            paddingTop:20,
        }}>
            <Text style={{color:"black"}}>To-Do</Text>
        </View>
    );
}

export default ToDo;







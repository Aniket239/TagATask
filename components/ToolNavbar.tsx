import React from "react";
import { Text, View } from "react-native";

const ToolNavbar = ()=>{
    return (
        <View style={{
            backgroundColor: "white",
            width: "100%",
            height:"7%",
            justifyContent: "flex-start",
            padding:20,
            marginBottom: 20,
        }}>
            <Text style={{color:'black'}}>Filter</Text>
        </View>
    )
}

export default ToolNavbar;
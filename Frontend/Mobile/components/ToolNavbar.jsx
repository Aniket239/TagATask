import React from "react";
import { Text, View, StyleSheet } from "react-native";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const ToolNavbar = () => {
    return (
        <View style={styles.toolbar}>
            <View style={styles.filter}>
                <Text style={styles.toolbarText}>Filter</Text>
                <MaterialIcon name="filter-list" color={"#5F6368"} size={25} />
            </View>
            <View style={styles.sort}>
                <Text style={styles.toolbarText}>Sort</Text>
                <MaterialIcon name="swap-vert" color={"#5F6368"} size={25} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    toolbar: {
        backgroundColor: "white",
        width: "100%",
        height: "7%",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingHorizontal: "5%",
        marginBottom: 20,
    },
    toolbarText: {
        color: 'black',
        fontSize: 20,
    },
    filter:{
        flexDirection: "row",
        alignItems: "center",
        marginRight: "3%"
    },
    sort:{
        flexDirection: "row",
        alignItems: "center",
    }
});

export default ToolNavbar;
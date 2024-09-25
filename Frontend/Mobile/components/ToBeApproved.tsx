import React, { useState } from "react";
import { Text, StyleSheet, View, Pressable, ScrollView } from "react-native";
import Accordion from 'react-native-collapsible/Accordion';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const ToBeApproved = () => {
    const EXECUTE = [
        {
            title: "For Execution",
            content: ["task 1", "task 2", "task 3", "task 4", "task 1", "task 2", "task 3", "task 4", "task 1", "task 2", "task 3", "task 4", "task 1", "task 2", "task 3", "task 4", "task 1", "task 2", "task 3", "task 4", "task 1", "task 2", "task 3", "task 4"]
        }
    ]
    const APPROVE = [
        {
            title: "For Approval",
            content: ["task 1", "task 2", "task 3", "task 4", "task 1", "task 2", "task 3", "task 4", "task 1", "task 2", "task 3", "task 4", "task 1", "task 2", "task 3", "task 4"]
        }
    ]

    const [isActive, setIsActive] = useState(false);
    return (
        <>
            <View style={styles.todoContainer}>
                <Text style={styles.todoHeader}>Follow up</Text>
                <View style={styles.accordion} >
                    <Pressable style={styles.header}>
                        <Text style={styles.headerText} >For Execution</Text>
                        <MaterialIcon name={isActive ? "arrow-drop-up" : "arrow-drop-down"} color={"#5F6368"} size={50} />
                    </Pressable>
                    <ScrollView>
                        {EXECUTE[0].content.map((item,index) => (
                            <Text key={index}>{item}</Text>
                        ))}
                    </ScrollView>
                </View>
                <View style={styles.accordion}>
                    <Pressable style={styles.header}>
                        <Text style={styles.headerText}>For Approval</Text>
                        <MaterialIcon name={isActive ? "arrow-drop-up" : "arrow-drop-down"} color={"#5F6368"} size={50} />
                    </Pressable>
                </View>
            </View>
        </>
    );
}
const styles = StyleSheet.create({
    todoContainer: {
        backgroundColor: "#f0f0f0",
        width: "98%",
        height: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
        borderRadius: 15,
        paddingTop: 15,
        paddingHorizontal: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    todoHeader: {
        color: '#333',
        fontSize: 23,
        marginBottom: 5,
        fontWeight: 'bold',
        textAlign: 'left',
        width: '100%',
        marginLeft: "5%"
    },
    accordion: {
        width: '100%',
        marginBottom: 20
    },
    accordionSection: {
        marginBottom: 10,
    },
    headerText: {
        color: '#333',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    header: {
        backgroundColor: '#fff',
        padding: 5,
        paddingLeft: 15,
        marginVertical: 3,
        marginHorizontal: 10,
        borderRadius: 10,
        // iOS shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        // Android shadow
        elevation: 2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    activeHeader: {
        backgroundColor: '#fff',
        padding: 5,
        paddingLeft: 15,
        marginVertical: 3,
        marginHorizontal: 10,
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        // iOS shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        // Android shadow
        elevation: 2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    contentContainer: {
        flex: 1,
        paddingBottom: 10,
        backgroundColor: '#fff',
        marginHorizontal: 10,
        marginBottom: 20,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        // Android shadow
        elevation: 2,
    },
    contentCard: {
        paddingHorizontal: "2%",
        paddingVertical: "2%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        margin: "auto",
        borderBottomWidth: 1,
        borderBottomColor: "lightgrey"
    },
    contentText: {
        color: '#333',
        fontSize: 16,
        lineHeight: 22,
        width: "68%",
    },
    approveContentText: {
        color: '#333',
        fontSize: 16,
        lineHeight: 22,
        width: "72%"
    },
    contentIcons: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "23%"
    },
    approveContentIcons: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "17%"
    }
});

export default ToBeApproved;
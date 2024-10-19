// /components/Accordion.js

import React, { useState, useEffect, useCallback } from "react";
import { Text, StyleSheet, View, Pressable, LayoutAnimation, Modal, Platform, UIManager } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import DraggableFlatList from "react-native-draggable-flatlist";
import { useDispatch } from "react-redux";
import { startScrolling, stopScrolling } from "../Redux/Slice/DragAndDrop";

// Enable LayoutAnimation on Android
if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Accordion = ({ title, tasks }) => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(true);
    const [data, setData] = useState([]);


    // Synchronize data with tasks prop
    useEffect(() => {
        const updatedData = tasks.map((task) => ({
            id: task.id.toString(), // Ensure id is a string
            title: task.title,
            dueDate: task.dueDate ? new Date(task.dueDate) : null,
            status: task.status, // Assuming there's a 'completed' field
        }));
        console.log(updatedData);
        setData(updatedData);
    }, [tasks]);

    // Toggle accordion with animation
    const toggleAccordion = useCallback(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsOpen((prev) => !prev);
    }, []);

    const newTask = () =>{
        
    }


    // Render each item in the draggable list
    const renderItem = useCallback(({ item, drag, isActive }) => (
        <>
            <View style={[
                styles.itemContainer,
                { backgroundColor: isActive ? "#e0e0e0" : "#fff" },
            ]}>
                <Pressable
                    onTouchStart={drag} // Alternative to onTouchStart
                    accessibilityLabel={`Task: ${item.title}`}
                    accessibilityRole="button"
                >
                    <MaterialIcon
                        name="drag-indicator"
                        size={27}
                        color="grey"
                        style={styles.icon}
                    />
                </Pressable>
                {(item.status === "execute" || item.status === "approve") && (
                    <MaterialIcon
                        name="check-box-outline-blank"
                        size={25}
                        color={"grey"}
                        style={styles.icon}
                    />
                )}
                <Pressable style={styles.taskData}>
                    <Text style={styles.itemText}>{item.title}</Text>
                    <View style={styles.icons}>
                        <Pressable onPress={() =>{}} accessibilityLabel="Set Due Date" accessibilityRole="button">
                            <MaterialIcon name="event" size={22} color={"grey"} />
                        </Pressable>
                        <Pressable onPress={() =>{}} accessibilityLabel="Set Due Time" accessibilityRole="button">
                            <MaterialIcon name="label-outline" size={22} color={"grey"} />
                        </Pressable>
                        <Pressable onPress={() => {/* Implement edit functionality */ }} accessibilityLabel="Edit Task" accessibilityRole="button">
                            <MaterialIcon name="edit" size={22} color={"grey"} />
                        </Pressable>
                    </View>
                </Pressable>
            </View>
        </>
    ), []);

    return (
        <View style={styles.accordionContainer}>
            <Pressable
                style={styles.header}
                onPress={toggleAccordion}
                accessibilityLabel={`${title} Accordion`}
                accessibilityRole="button"
            >
                <Text style={styles.headerText}>{title}</Text>
                <MaterialIcon
                    name={isOpen ? "expand-less" : "expand-more"}
                    size={24}
                    color="#555"
                />
            </Pressable>

            {/* Accordion Content */}
            {isOpen && (
                <View style={styles.content}>
                    <DraggableFlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        onDragEnd={({ data }) => {
                            setData(data);
                            dispatch(startScrolling());
                        }}
                        initialNumToRender={10}
                        horizontal={false}
                        scrollEnabled={true}
                        onDragBegin={() => dispatch(stopScrolling())}
                    />
                    {(title === "Execute") && (
                        <View style={styles.addTaskContainer}>
                            <Pressable
                                onPress={() => {newTask}}
                                style={styles.addTaskPressable}
                                accessibilityLabel="Add Task"
                                accessibilityRole="button"
                            >
                                <MaterialIcon name="add" size={27} color={"grey"} />
                                <Text style={styles.addTaskText}>Add Task</Text>
                            </Pressable>
                        </View>

                    )}
                </View>
            )}

             </View>
    );
};

// Memoize the Accordion to prevent unnecessary re-renders
export default React.memo(Accordion);

const styles = StyleSheet.create({
    accordionContainer: {
        marginBottom: 16, // Space between accordions
        borderRadius: 12, // Increased border radius for smoother edges
        borderWidth: 1,
        borderColor: "#e0e0e0", // Lighter border color for subtlety
        backgroundColor: "#ffffff", // White background for clean look
        // Shadow for iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        // Elevation for Android
        elevation: 3,
    },
    header: {
        flexDirection: "row",
        paddingVertical: "3%",
        paddingHorizontal: "4%",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#f9f9f9", // Slightly off-white for distinction
        borderRadius: 12, // Increased border radius for smoother edges
    },
    headerText: {
        fontSize: 18,
        fontWeight: "700",
        color: "#333333", // Darker text for better readability
    },
    content: {
        backgroundColor: "#ffffff", // Consistent white background
        borderRadius: 12, // Increased border radius for smoother edges
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0", // Lighter border for separation
        paddingVertical: '2%',
        marginHorizontal: '1%',
        borderRadius: 12, // Increased border radius for smoother edges
    },
    taskData: {
        flex: 1, // Allow task data to take up remaining space
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    icon: {
        marginRight: "1%", // Increased spacing for better touch targets
    },
    itemText: {
        fontSize: 18,
        color: "black", // Medium dark text for clarity
        flex: 1, // Allow text to take up remaining space
    },
    icons: {
        width: "25%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginRight: "1%", // Increased spacing for better touch targets
    },

    addTaskContainer: {
        backgroundColor: "#ffffff", // Match the background of the accordion content
        alignItems: "flex-start", // Align Add Task to the start
        paddingLeft: "8.6%",
        paddingVertical: "2%",
        paddingHorizontal: "1%",
        borderRadius: 12, // Increased border radius for smoother edges
    },

    addTaskPressable: {
        flexDirection: "row", // To place the icon and text in a row
        alignItems: "center", // Vertically align icon and text
        justifyContent: "center", // Center content horizontally
    },
    addTaskText: {
        fontSize: 20, // Medium text size
        color: "grey", // Dark grey for contrast with background
        fontWeight: "bold", //
        marginLeft: "1%", // Add space between the icon and text
    },

    // Modal styles
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.6)", // Darker overlay for focus
    },
    modalContainer: {
        width: "85%",
        backgroundColor: "#ffffff",
        borderRadius: 12,
        padding: 25,
        alignItems: "flex-start",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 20,
        color: "#333333",
    },
    modalButtonsContainer: {
        flexDirection: "row",
        width: "100%",
        marginBottom: 20,
        alignItems: "center",
        justifyContent: "space-between",
    },
    modalButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    modalButtonText: {
        color: "#555555",
        fontSize: 16,
        marginLeft: 8,
    },
    modalActionsContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        width: "100%",
    },
    cancelButtonText: {
        color: "#ff3b30", // Red color for destructive action
        fontSize: 18,
        marginRight: 25,
        fontWeight: "600",
    },
    doneButtonText: {
        color: "#007aff", // Blue color for primary action
        fontSize: 18,
        fontWeight: "600",
    },
});

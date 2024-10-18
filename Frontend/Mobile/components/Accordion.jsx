// /components/Accordion.js

import React, { useState, useEffect, useCallback } from "react";
import { Text, StyleSheet, View, Pressable, LayoutAnimation, Modal, Platform, UIManager } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import DraggableFlatList from "react-native-draggable-flatlist";
import { useDispatch } from "react-redux";
import { startScrolling, stopScrolling } from "../Redux/Slice/DragAndDrop";
import DateTimePicker from '@react-native-community/datetimepicker';

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
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    // Synchronize data with tasks prop
    useEffect(() => {
        const updatedData = tasks.map((task) => ({
            id: task.id.toString(), // Ensure id is a string
            title: task.title,
            dueDate: task.dueDate ? new Date(task.dueDate) : null,
            completed: task.completed || false, // Assuming there's a 'completed' field
        }));
        setData(updatedData);
    }, []);

    // Toggle accordion with animation
    const toggleAccordion = useCallback(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsOpen((prev) => !prev);
    }, []);

    // Handle date change
    const onChangeDate = useCallback((event, date) => {
        setShowDatePicker(false);
        if (event.type === "set" && date) {
            setSelectedDate(date);
            // Update the dueDate for the selected task
            setData((prevData) =>
                prevData.map((task) =>
                    task.id === selectedTaskId
                        ? { ...task, dueDate: date }
                        : task
                )
            );
        }
    }, [selectedTaskId]);

    // Handle time change
    const onChangeTime = useCallback((event, time) => {
        setShowTimePicker(false);
        if (event.type === "set" && time) {
            setSelectedDate(time);
            // Update the dueDate for the selected task
            setData((prevData) =>
                prevData.map((task) =>
                    task.id === selectedTaskId
                        ? { ...task, dueDate: time }
                        : task
                )
            );
        }
    }, [selectedTaskId]);

    // Open Due Date Modal
    const openDueDate = useCallback((taskId) => {
        setSelectedTaskId(taskId);
        setModalVisible(true) ? setShowDatePicker(true) : setShowDatePicker(false);

    }, []);

    const openDueTime = useCallback((taskId) => {
        setSelectedTaskId(taskId);
        setModalVisible(true);
        setShowTimePicker(true);
    }, []);

    // Reset DateTime
    const resetDateTime = useCallback(() => {
        if (selectedTaskId !== null) {
            setData((prevData) =>
                prevData.map((task) =>
                    task.id === selectedTaskId
                        ? { ...task, dueDate: null }
                        : task
                )
            );
            setSelectedDate(new Date());
        }
    }, [selectedTaskId]);

    // Close Modal
    const closeModal = useCallback(() => {
        setModalVisible(false);
        setSelectedTaskId(null);
        setShowDatePicker(false);
        setShowTimePicker(false);
    }, []);

    // Render each item in the draggable list
    const renderItem = useCallback(({ item, drag, isActive }) => (
        <>
            <View style={[
                        styles.itemContainer,
                        { backgroundColor: isActive ? "#e0e0e0" : "#fff" },
                    ]}>
                <Pressable
                    onLongPress={drag} // Alternative to onTouchStart
                    accessibilityLabel={`Task: ${item.title}`}
                    accessibilityRole="button"
                >
                    <MaterialIcon
                        name="drag-indicator"
                        size={30}
                        color="grey"
                        style={styles.icon}
                    />
                </Pressable>
                <MaterialIcon
                    name={item.completed ? "check-box" : "check-box-outline-blank"}
                    size={27}
                    color={"grey"}
                    style={styles.icon}
                />
                <Pressable style={styles.taskData}>
                    <Text style={styles.itemText}>{item.title}</Text>
                    <View style={styles.icons}>
                        <Pressable onPress={() => openDueDate(item.id)} accessibilityLabel="Set Due Date" accessibilityRole="button">
                            <MaterialIcon name="event" size={27} color={"grey"} />
                        </Pressable>
                        <Pressable onPress={() => openDueTime(item.id)} accessibilityLabel="Set Due Time" accessibilityRole="button">
                            <MaterialIcon name="schedule" size={27} color={"grey"} />
                        </Pressable>
                        <Pressable onPress={() => {/* Implement edit functionality */ }} accessibilityLabel="Edit Task" accessibilityRole="button">
                            <MaterialIcon name="edit" size={27} color={"grey"} />
                        </Pressable>
                    </View>
                </Pressable>
            </View>
        </>
    ), [openDueDate, openDueTime]);

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
                        contentContainerStyle={{ paddingBottom: 20 }}
                        horizontal={false}
                        scrollEnabled={true}
                        onDragBegin={() => dispatch(stopScrolling())}
                    />
                </View>
            )}

            {/* Due Date Modal */}
            <Modal
                transparent={true}
                animationType="fade"
                visible={modalVisible}
                onRequestClose={closeModal}
                accessible={true}
                accessibilityViewIsModal={true}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Set Due Date & Time</Text>
                        <View style={styles.modalButtonsContainer}>
                            <Pressable style={styles.modalButton} onPress={() => openDueDate(selectedTaskId)}>
                                <MaterialIcon name="today" color={"grey"} size={25} />
                                <Text style={styles.modalButtonText}>
                                    {data.find(task => task.id === selectedTaskId && task.dueDate)
                                        ? new Date(data.find(task => task.id === selectedTaskId).dueDate).toLocaleDateString()
                                        : "Select Date"}
                                </Text>
                            </Pressable>
                            <Pressable style={styles.modalButton} onPress={() => openDueTime(selectedTaskId)}>
                                <MaterialIcon name="schedule" color={"grey"} size={25} />
                                <Text style={styles.modalButtonText}>
                                    {data.find(task => task.id === selectedTaskId && task.dueDate)
                                        ? new Date(data.find(task => task.id === selectedTaskId).dueDate).toLocaleTimeString()
                                        : "Select Time"}
                                </Text>
                            </Pressable>
                            <Pressable onPress={resetDateTime} accessibilityLabel="Reset Due Date & Time" accessibilityRole="button">
                                <MaterialIcon name="close" color={"grey"} size={25} />
                            </Pressable>
                        </View>
                        <View style={styles.modalActionsContainer}>
                            <Pressable onPress={closeModal} accessibilityLabel="Cancel" accessibilityRole="button">
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </Pressable>
                            <Pressable onPress={closeModal} accessibilityLabel="Done" accessibilityRole="button">
                                <Text style={styles.doneButtonText}>Done</Text>
                            </Pressable>
                        </View>
                        {/* Date Picker */}
                        {showDatePicker && (
                            <DateTimePicker
                                value={selectedDate}
                                mode="date"
                                display="default"
                                onChange={onChangeDate}
                            />
                        )}
                        {/* Time Picker */}
                        {showTimePicker && (
                            <DateTimePicker
                                value={selectedDate}
                                mode="time"
                                display="default"
                                onChange={onChangeTime}
                            />
                        )}
                    </View>
                </View>
            </Modal>
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
        paddingVertical: 16,
        paddingHorizontal: 20,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#f9f9f9", // Slightly off-white for distinction
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    headerText: {
        fontSize: 18,
        fontWeight: "700",
        color: "#333333", // Darker text for better readability
    },
    content: {
        backgroundColor: "#ffffff", // Consistent white background
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0", // Lighter border for separation
        paddingVertical: '2%',
        marginHorizontal: '1%'
    },
    taskData: {
        flex: 1, // Allow task data to take up remaining space
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    icon: {
        marginRight: 15, // Increased spacing for better touch targets
    },
    itemText: {
        fontSize: 16,
        color: "#555555", // Medium dark text for clarity
        flex: 1, // Allow text to take up remaining space
    },
    icons: {
        flexDirection: "row",
        alignItems: "center",
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

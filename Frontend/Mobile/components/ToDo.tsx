import React, { useState } from "react";
import {
    Text,
    StyleSheet,
    View,
    Pressable,
    LayoutAnimation,
    UIManager,
    Platform,
    Modal,
} from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import DraggableFlatList from "react-native-draggable-flatlist";
import { useDispatch } from "react-redux";
import { startScrolling, stopScrolling } from "../Redux/Slice/DragAndDrop";
import { ScrollView } from "react-native-gesture-handler";
import DateTimePicker from '@react-native-community/datetimepicker';

const Accordion = ({ title, tasks }) => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(true);
    const initialData = tasks.map((task, index) => ({
        id: `${title}-${index + 1}`,
        title: task,
        dueDate: null, // Initialize dueDate as null
    }));
    const [data, setData] = useState(initialData);
    console.log(data);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    // Toggle accordion with animation
    const toggleAccordion = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsOpen(!isOpen);
    };

    // Handle date change
    const onChangeDate = (event, selectedDate) => {
        setShowDatePicker(false);
        if (event.type === "set" && selectedDate) {
            setSelectedDate(selectedDate);
            // Update the dueDate for the selected task
            setData(prevData =>
                prevData.map(task =>
                    task.id === selectedTaskId
                        ? { ...task, dueDate: selectedDate }
                        : task
                )
            );
        }
    };
    const onChangeTime = (event, selectedDate) => {
        setShowTimePicker(false);
        if (event.type === "set" && selectedDate) {
            setSelectedDate(selectedDate);
            // Update the dueDate for the selected task
            setData(prevData =>
                prevData.map(task =>
                    task.id === selectedTaskId
                        ? { ...task, dueDate: selectedDate }
                        : task
                )
            );
        }
    };

    // Open Due Date Modal
    const openDueDateTimeModal = () => {
        setModalVisible(true);
    };
    const openDueDate = (taskId) => {
        setModalVisible(true);
        setSelectedTaskId(taskId);
        setShowDatePicker(true);
    };
    const openDueTime = (taskId) => {
        setModalVisible(true);
        setSelectedTaskId(taskId);
        setShowTimePicker(true);
    };

    const resetDateTime = (taskId) => {
        setSelectedDate(new Date());
    };

    // Close Modal
    const closeModal = () => {
        setModalVisible(false);
        setSelectedTaskId(null);
        setShowDatePicker(false);
    };

    // Render each item in the draggable list
    const renderItem = ({ item, index, drag, isActive }) => {
        return (
            <Pressable
                style={[
                    styles.itemContainer,
                    { backgroundColor: isActive ? "#e0e0e0" : "#fff" },
                ]}
            >
                <Pressable onTouchStart={drag} style={styles.handleContainer}>
                    <MaterialIcon
                        name="drag-indicator"
                        size={30}
                        color="grey"
                        style={styles.icon}
                    />
                </Pressable>
                <MaterialIcon name="check-box-outline-blank" size={27} color={"grey"} style={styles.icon} />
                <Text style={styles.itemText}>{item.title}</Text>
                <View style={styles.icons}>
                    <Pressable onPress={openDueDateTimeModal}>
                        <MaterialIcon name="event" size={27} color={"grey"} />
                    </Pressable>
                    <Pressable>
                        <MaterialIcon name="label-outline" size={27} color={"grey"} />
                    </Pressable>
                    <Pressable>
                        <MaterialIcon name="edit" size={27} color={"grey"} />
                    </Pressable>
                </View>
            </Pressable>
        );
    };

    return (
        <View style={styles.accordionContainer}>
            {/* Accordion Header */}
            <Pressable style={styles.header} onPress={toggleAccordion}>
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
                            dispatch(startScrolling())
                        }} // Update data on drag end
                        initialNumToRender={10}
                        contentContainerStyle={{ backgroundColor: "darkgrey" }}
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
            >
                <View style={styles.dateModalOverlay}>
                    <View style={styles.dateContainer}>
                        <Text style={styles.dateTitle}>Due Date</Text>
                        <View style={styles.dateTimeContainer}>
                            <Pressable style={styles.dateTimeButton} onPress={openDueDate}>
                                <MaterialIcon name="today" color={"grey"} size={25} />
                                <Text style={styles.dateText}>{selectedDate.toLocaleDateString()}</Text>
                            </Pressable>
                            <Pressable style={styles.dateTimeButton} onPress={openDueTime}>
                                <MaterialIcon name="schedule" color={"grey"} size={25} />
                                <Text style={styles.dateText}>{selectedDate.toLocaleTimeString()}</Text>
                            </Pressable>
                            <Pressable onPress={resetDateTime}>
                                <MaterialIcon name="close" color={"grey"} size={25} />
                            </Pressable>
                        </View>
                        <Text style={styles.dateText}>Set Reminder</Text>
                        <View style={styles.dateButtons}>
                            <Pressable onPress={closeModal}>
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </Pressable>
                            <Pressable>
                                <Text style={styles.doneButtonText}>Done</Text>
                            </Pressable>
                        </View>
                    </View>
                    {showDatePicker && (
                        <DateTimePicker
                            value={selectedDate}
                            mode="date"
                            display="default"
                            onChange={onChangeDate}
                            positiveButton={{ label: 'Set Due Date' }}
                        />
                    )}
                    {showTimePicker && (
                        <DateTimePicker
                            value={selectedDate}
                            mode="time"
                            display="default"
                            onChange={onChangeTime}
                            positiveButton={{ label: 'Set Due Time' }}
                        />
                    )}
                </View>
            </Modal>
        </View>
    );
};

// Main Component Rendering Two Accordions
const ToDo = () => {
    const EXECUTE = [
        {
            title: "Execute",
            content: [
                "Execute Task 1bdflblrbdaljkbadlkbdfklbdfkljbadfklbfkbdfjkbfkdjbakjdfbakjfbkafbafkjbafkjbafbk",
                "Execute Task 2",
                "Execute Task 3",
                "Execute Task 4",
                "Execute Task 5",
                "Execute Task 6",
                "Execute Task 7",
                "Execute Task 8",
                "Execute Task 9",
                "Execute Task 10",
                "Execute Task 11",
                "Execute Task 12",
                "Execute Task 13",
                "Execute Task 14",
                "Execute Task 15",
                "Execute Task 16",
                "Execute Task 17",
                "Execute Task 18",
                "Execute Task 19",
                "Execute Task 20",
                "Execute Task 21",
                "Execute Task 22",
                "Execute Task 23",
                "Execute Task 24",
            ],
        },
    ];

    const APPROVE = [
        {
            title: "Approve",
            content: [
                "Approve Task 1",
                "Approve Task 2",
                "Approve Task 3",
                "Approve Task 4",
                "Approve Task 5",
                "Approve Task 6",
                "Approve Task 7",
                "Approve Task 8",
                "Approve Task 9",
                "Approve Task 10",
                "Approve Task 11",
                "Approve Task 12",
                "Approve Task 13",
                "Approve Task 14",
                "Approve Task 15",
                "Approve Task 16",
            ],
        },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>To-Do</Text>
            <ScrollView>
                {EXECUTE.map((section) => (
                    <Accordion
                        key={section.title}
                        title={section.title}
                        tasks={section.content}
                    />
                ))}
                {APPROVE.map((section) => (
                    <Accordion
                        key={section.title}
                        title={section.title}
                        tasks={section.content}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

export default ToDo;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 2,
        backgroundColor: "#f2f2f2", // Light background for contrast
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "600",
        color: "#000", // Black text
        margin: 10
    },
    accordionContainer: {
        marginBottom: 16, // Space between accordions
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ccc",
        backgroundColor: "#fff",
        // Add shadow for iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        // Add elevation for Android
        elevation: 2,
    },
    header: {
        flexDirection: "row",
        padding: 16,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#f0f0f0", // Slightly lighter for better visibility
        borderRadius: 8,
    },
    headerText: {
        fontSize: 18,
        fontWeight: "600",
        color: "#000", // Black text
    },
    content: {
        maxHeight: 500, // Limit the height to prevent overflow
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    handleContainer: {
        paddingVertical: '1%',
    },
    icon: {
        marginRight: 1,
    },
    itemText: {
        fontSize: 16,
        color: "black", // Black text
        flex: 1, // Allow text to take up remaining space
        marginLeft: 5,
    },
    icons: {
        width: "25%",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: 10
    },
    // Modal styles
    dateModalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    dateContainer: {
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 2,
        padding: 20,
        alignItems: "flex-start",
    },
    dateTitle: {
        fontSize: 20,
        fontWeight: "600",
        marginBottom: "2%",
        color: "black",
    },
    dateTimeContainer: {
        flexDirection: "row",
        width: "100%",
        marginBottom: "2%",
        alignItems: "center",
        justifyContent: "space-between",
    },
    dateTimeButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    dateText: {
        color: "black",
        fontSize: 20,
        marginRight: "5%"
    },
    dateButtons: {
        flexDirection: "row",
        justifyContent: "flex-end",
        width: "100%",
    },
    cancelButtonText: {
        color: "black",
        fontSize: 18,
        marginRight: "10%"
    },
    doneButtonText: {
        color: "black",
        fontSize: 18,
    }
});

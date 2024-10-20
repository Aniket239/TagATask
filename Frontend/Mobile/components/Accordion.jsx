import React, { useState, useEffect, useCallback } from "react";
import { Text, StyleSheet, View, Pressable, LayoutAnimation, TextInput, UIManager, Platform } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import DraggableFlatList from "react-native-draggable-flatlist";
import { useDispatch } from "react-redux";
import { startScrolling, stopScrolling } from "../Redux/Slice/DragAndDrop";
import { addTask, reorderTask } from "../Redux/Slice/taskSlice";

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
    const [editTitle, setEditTitle] = useState(false);
    console.log("====================================================== all tasks ================================================");
    console.log(tasks);
    console.log("====================================================== all tasks ================================================");
    
    // Synchronize data with tasks prop
    useEffect(() => {
        const updatedData = tasks.map((task) => ({
            id: task.id.toString(),
            title: task.title,
            dueDate: task.dueDate, // Keep as string
            status: task.status,
        }));
        setData(updatedData);
    }, []);
    

    // Toggle accordion with animation
    const toggleAccordion = useCallback(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsOpen((prev) => !prev);
    }, []);

    const addNewTask = () => {
        const newTask = {
            id: (data.length + 1).toString(),
            title: "", // Empty title to start editing
            dueDate: new Date(), // Store as ISO string
            status: "execute", // Default status
            isNew: true, // Flag to indicate this is a new task being edited
        };
        setData([...data, newTask]);
    };
    

    // Handle task title change
    const handleTitleChange = (text, id) => {
        const updatedData = data.map(task =>
            task.id === id ? { ...task, title: text } : task
        );
        setData(updatedData); // Ensure you're setting a new array reference
    }
    // Render each item in the draggable list
    const renderItem = useCallback(({ item, drag, isActive }) => (
        <View style={[styles.itemContainer, { backgroundColor: isActive ? "#e0e0e0" : "#fff" }]}>
            <Pressable onTouchStart={drag} accessibilityLabel={`Task: ${item.title}`} accessibilityRole="button">
                <MaterialIcon name="drag-indicator" size={27} color="grey" style={styles.icon} />
            </Pressable>

            {(item.status === "execute" || item.status === "approve") && (
                <MaterialIcon name="check-box-outline-blank" size={25} color={"grey"} style={styles.icon} />
            )}

            <View style={styles.taskData}>
                {item.isNew ? (
                    <View style={styles.taskData}>
                        <TextInput
                            style={styles.itemText}
                            value={item.title}
                            autoFocus={true}
                            onChangeText={(text) => handleTitleChange(text, item.id)}
                            onBlur={() => {
                                dispatch(addTask(item));
                                // Optionally, you can add a new task here if needed
                            }}
                            onSubmitEditing={() => {
                                addNewTask(); // Add a new task
                            }}
                        />
                    </View>
                ) : (
                    <Pressable style={styles.taskData} onPress={() => setEditTitle(true)}>
                        <TextInput
                            style={styles.itemText}
                            value={item.title}
                            editable={editTitle}
                            onChangeText={(text) => handleTitleChange(text, item.id)}
                        />
                    </Pressable>
                )}
                <View style={styles.icons}>
                    <Pressable onPress={() => { }} accessibilityLabel="Set Due Date" accessibilityRole="button">
                        <MaterialIcon name="event" size={22} color={"grey"} />
                    </Pressable>
                    <Pressable onPress={() => { }} accessibilityLabel="Set Due Time" accessibilityRole="button">
                        <MaterialIcon name="label-outline" size={22} color={"grey"} />
                    </Pressable>
                    <Pressable onPress={() => { }} accessibilityLabel="Edit Task" accessibilityRole="button">
                        <MaterialIcon name="edit" size={22} color={"grey"} />
                    </Pressable>
                </View>
            </View>
        </View>
    ), [data]);

    return (
        <View style={styles.accordionContainer}>
            <Pressable style={styles.header} onPress={toggleAccordion} accessibilityLabel={`${title} Accordion`} accessibilityRole="button">
                <Text style={styles.headerText}>{title}</Text>
                <MaterialIcon name={isOpen ? "expand-less" : "expand-more"} size={24} color="#555" />
            </Pressable>

            {/* Accordion Content */}
            {isOpen && (
                <View style={[styles.content, title === "Execute" && { paddingBottom: 48 }]}>
                    <DraggableFlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        onDragEnd={({ data }) => {
                            const updatedData = [...data]; // Create a new array
                            setData(updatedData);
                            dispatch(reorderTask(updatedData));
                            dispatch(startScrolling());
                        }}
                        initialNumToRender={10}
                        horizontal={false}
                        scrollEnabled={true}
                        onDragBegin={() => dispatch(stopScrolling())}
                    />
                    {title === "Execute" && (
                        <View style={styles.addTaskContainer}>
                            <Pressable
                                onPress={addNewTask}
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
        marginBottom: 16, // Space between accordions to avoid overlapping when collapsed
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#e0e0e0",
        backgroundColor: "#ffffff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        position: 'relative', // Ensure relative positioning for absolute children
    },
    header: {
        flexDirection: "row",
        paddingVertical: "3%",
        paddingHorizontal: "4%",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        borderRadius: 12,
        zIndex: 1, // Ensure the header stays above the list
        position: "relative", // Change from "absolute" to allow accordion height to expand naturally
    },
    headerText: {
        fontSize: 18,
        fontWeight: "700",
        color: "#333333",
    },
    content: {
        backgroundColor: "#ffffff",
        borderRadius: 12,
        maxHeight: 500, // Limit the height to prevent the list from growing too tall
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
        borderRadius: 12,
    },
    taskData: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    icon: {
        marginRight: "1%",
    },
    itemText: {
        fontSize: 18,
        color: "black",
        width: "100%",
    },
    icons: {
        width: "25%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginRight: "1%",
    },
    addTaskContainer: {
        position: "absolute", // Fix the Add Task button at the bottom of the accordion
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#ffffff",
        borderTopWidth: 1,
        borderTopColor: "#e0e0e0",
        borderRadius: 12,
        alignItems: "flex-start", // Center the Add Task button
        zIndex: 1, // Ensure the button stays on top of the content
    },
    addTaskPressable: {
        paddingVertical: 10,
        paddingLeft: "7.7%",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    addTaskText: {
        fontSize: 20,
        color: "grey",
        fontWeight: "bold",
        marginLeft: "1%",
    },
    textInput: {
        fontSize: 18,
        color: "black",
        borderBottomWidth: 1,
        borderBottomColor: "#cccccc",
        padding: 4,
        flex: 1,
    },
});

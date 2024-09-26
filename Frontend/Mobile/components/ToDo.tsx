import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import DraggableFlatList from "react-native-draggable-flatlist";

// Enable LayoutAnimation for Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Reusable Accordion Component
const Accordion = ({ title, tasks }) => {
  // State to manage accordion open/close
  const [isOpen, setIsOpen] = useState(false);

  // Convert tasks to objects with unique ids
  const initialData = tasks.map((task, index) => ({
    id: `${title}-${index + 1}`,
    title: task,
  }));

  // State to manage draggable list data
  const [data, setData] = useState(initialData);

  // Toggle accordion with animation
  const toggleAccordion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
  };

  // Render each item in the draggable list
  const renderItem = ({ item, index, drag, isActive }) => {
    return (
      <Pressable
        style={[
          styles.itemContainer,
          { backgroundColor: isActive ? "#e0e0e0" : "#fff" },
        ]}
        // Remove onLongPress from the entire item
      >
        {/* Drag Handle */}
        <Pressable onLongPress={drag} style={styles.handleContainer}>
          <MaterialIcon
            name="drag-indicator"
            size={24}
            color="grey"
            style={styles.icon}
          />
        </Pressable>
        {/* Task Title */}
        <Text style={styles.itemText}>{item.title}</Text>
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
            onDragEnd={({ data }) => setData(data)} // Update data on drag end
            // Improve performance with initialNumToRender
            initialNumToRender={10}
            // Add some padding at the bottom
            contentContainerStyle={{ paddingBottom: 20 }}
            // Ensure vertical scrolling only
            horizontal={false}
            scrollEnabled={true}
          />
        </View>
      )}
    </View>
  );
};

// Main Component Rendering Two Accordions
const ToDo = () => {
  const EXECUTE = [
    {
      title: "Execute",
      content: [
        "Execute Task 1",
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
        <Text style={styles.headerText}>To Do</Text>
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
    </View>
  );
};

export default ToDo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    width: "98%",
    height: "97%",
    borderRadius: 15,
    paddingTop: 25,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    margin: "auto"
  },
  accordionContainer: {
    marginBottom: 16, // Space between accordions
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    overflow: "hidden",
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
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000", // Black text
  },
  content: {
    maxHeight: 400, // Limit the height to prevent overflow
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    marginVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    // Add shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    // Add elevation for Android
    elevation: 1,
  },
  handleContainer: {
    padding: 4, // Increase touch area for better usability
  },
  icon: {
    marginRight: 16,
  },
  itemText: {
    fontSize: 16,
    color: "#000", // Black text
    flex: 1, // Allow text to take up remaining space
  },
});

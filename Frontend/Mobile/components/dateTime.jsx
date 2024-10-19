import React from "react";
import DateTimePicker from '@react-native-community/datetimepicker';

const [modalVisible, setModalVisible] = useState(false);
const [selectedTaskId, setSelectedTaskId] = useState(null);
const [selectedDate, setSelectedDate] = useState(new Date());
const [showDatePicker, setShowDatePicker] = useState(false);
const [showTimePicker, setShowTimePicker] = useState(false);
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
                    <MaterialIcon name="today" color={"grey"} size={20} />
                    <Text style={styles.modalButtonText}>
                        {data.find(task => task.id === selectedTaskId && task.dueDate)
                            ? new Date(data.find(task => task.id === selectedTaskId).dueDate).toLocaleDateString()
                            : "Select Date"}
                    </Text>
                </Pressable>
                <Pressable style={styles.modalButton} onPress={() => openDueTime(selectedTaskId)}>
                    <MaterialIcon name="schedule" color={"grey"} size={20} />
                    <Text style={styles.modalButtonText}>
                        {data.find(task => task.id === selectedTaskId && task.dueDate)
                            ? new Date(data.find(task => task.id === selectedTaskId).dueDate).toLocaleTimeString()
                            : "Select Time"}
                    </Text>
                </Pressable>
                <Pressable onPress={resetDateTime} accessibilityLabel="Reset Due Date & Time" accessibilityRole="button">
                    <MaterialIcon name="close" color={"grey"} size={20} />
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

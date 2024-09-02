import React, { useEffect, useState } from "react";
import { View, TextInput, Button, StyleSheet, Modal, Pressable, Text } from "react-native";
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-date-picker';

interface Task {
    title: string;
    date: Date;  // Use Date object for consistency
    tag: string[];
    recurrence: string | null;
    comment: string;
}

const data = [
    { label: 'Work', value: 'Work' },
    { label: 'Personal', value: 'Personal' },
    { label: 'Shopping', value: 'Shopping' },
    { label: 'Others', value: 'Others' },
];

const recurrenceData = [
    { label: 'None', value: 'None' },
    { label: 'Daily', value: 'Daily' },
    { label: 'Weekly', value: 'Weekly' },
    { label: 'Monthly', value: 'Monthly' },
];

const NewTask = ({ isOpenTask, onClose, onSave, taskData }: { isOpenTask: boolean; onClose: () => void; onSave: (task: Task) => void; taskData?: Task | null }) => {
    const [title, setTitle] = useState(taskData?.title || "");
    const [date, setDate] = useState<Date>(taskData?.date ? new Date(taskData.date) : new Date());
    const [tag, setTag] = useState<string[]>(taskData?.tag || []);
    const [recurrence, setRecurrence] = useState<string | null>(taskData?.recurrence || null);
    const [comment, setComment] = useState(taskData?.comment || "");
    const [isFocus, setIsFocus] = useState(false);
    const [titleError, setTitleError] = useState(false);
    const [open, setOpen] = useState(false);

    // Update state when taskData changes
    useEffect(() => {
        if (taskData) {
            setTitle(taskData.title);
            setDate(new Date(taskData.date));
            setTag(taskData.tag);
            setRecurrence(taskData.recurrence);
            setComment(taskData.comment);
        }
    }, [taskData]);

    const handleDelete = () => {
        const task = { title: "", date: new Date(), tag: [], recurrence: null, comment: "" };
        onSave(task);
        setTitle("");
        setDate(new Date());
        setTag([]);
        setRecurrence(null);
        setComment("");
        onClose();
    };

    const closeTask = () => {
        onClose();
    };

    const saveTask = () => {
        if (title.trim() === "") {
            setTitleError(true); // Show error if title is empty
            return;
        }

        const task = { title, date, tag, recurrence, comment };
        onSave(task);
        setTitle("");
        setDate(new Date());
        setTag([]);
        setRecurrence(null);
        setComment("");
        setTitleError(false); // Reset error on successful save
        onClose();
    };

    return (
        <Modal
            animationType="slide"
            visible={isOpenTask}
        >
            <View style={styles.modalStyle}>
                <View style={styles.taskUpdate}>
                    <Pressable onPress={closeTask}>
                        <MaterialIcon name="close" size={30} color="black" />
                    </Pressable>
                    <Pressable onPress={saveTask}>
                        <MaterialIcon name="check" size={30} color="black" />
                    </Pressable>
                </View>
                <View style={styles.inputContainer}>
                    {titleError && <Text style={styles.errorText}>Task name is required</Text>}
                    <TextInput
                        style={[styles.textInput, titleError && styles.errorInput]} // Apply error style if title is missing
                        value={title}
                        onChangeText={(text) => {
                            setTitle(text);
                            setTitleError(false); // Reset error on change
                        }}
                        editable={isOpenTask}
                        placeholder="Title"
                        placeholderTextColor={titleError ? "#ff6666" : "#666"} // Change placeholder color if there's an error
                    />
                    <Pressable onPress={() => setOpen(true)} style={styles.textInput}>
                        <Text style={styles.dateText}>{date.toLocaleDateString()} {date.toLocaleTimeString()}</Text>
                    </Pressable>
                    <DatePicker
                        modal
                        open={open}
                        date={date}
                        onConfirm={(date) => {
                            setOpen(false);
                            setDate(date);
                        }}
                        onCancel={() => {
                            setOpen(false);
                        }}
                    />
                    <MultiSelect
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        data={data}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Tag' : '...'}
                        searchPlaceholder="Search..."
                        value={tag}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setTag(item);
                            setIsFocus(false);
                        }}
                        disable={!isOpenTask}
                        itemContainerStyle={styles.dropdownItemContainer}
                        itemTextStyle={styles.dropdownItemText}
                        activeColor="#cceeff"
                    />
                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        data={recurrenceData}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Recurrence' : '...'}
                        value={recurrence}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setRecurrence(item.value);
                            setIsFocus(false);
                        }}
                        disable={!isOpenTask}
                        itemContainerStyle={styles.dropdownItemContainer}
                        itemTextStyle={styles.dropdownItemText}
                        activeColor="#cceeff"
                    />
                    <TextInput
                        style={[styles.textInput, { height: 60 }]}
                        value={comment}
                        onChangeText={setComment}
                        editable={isOpenTask}
                        placeholder="Comment"
                        placeholderTextColor="#666"
                        multiline={true}
                    />
                    <Button
                        title="Delete"
                        color="red"
                        onPress={handleDelete}
                        disabled={!isOpenTask}
                    />
                </View>
            </View>
        </Modal>
    );
};

export default NewTask;

const styles = StyleSheet.create({
    modalStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        width: "100%",
        height: "100%",
    },
    inputContainer: {
        width: "100%",
        height: "95%",
        padding: 20, // Padding for the content within the modal
        backgroundColor: "#fff", // Background color for better contrast
        alignSelf: "center", // Center the content horizontally
    },
    taskUpdate: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20,
        paddingBottom: 13,
        backgroundColor: "lightgrey"
    },
    textInput: {
        color: "#333",
        borderWidth: 1,
        borderColor: "#ccc",
        paddingVertical: 12,
        paddingHorizontal: 18,
        borderRadius: 10,
        marginBottom: 20,
        backgroundColor: "#fff",
        fontSize: 18,
    },
    dateText: {
        color: "#333", // Set the date text color to black
    },
    dropdown: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
        backgroundColor: "#fff",
        color: "#333",
    },
    placeholderStyle: {
        fontSize: 16,
        color: "#666",
    },
    selectedTextStyle: {
        fontSize: 16,
        color: "#333",
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        color: "#333",
        backgroundColor: "#f9f9f9",
        borderRadius: 8,
        paddingHorizontal: 10,
    },
    dropdownItemContainer: {
        backgroundColor: "#fafafa",
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    dropdownItemText: {
        color: "#333",
        fontSize: 16,
    },
    selectedItemContainer: {
        backgroundColor: "#e0f7fa",
        borderRadius: 8,
    },
    selectedItemText: {
        color: "#00796b",
    },
    errorInput: {
        borderColor: "#ff6666", // Red border color to indicate error
    },
    errorText: {
        color: "#ff6666", // Red text color for error message
        marginBottom: 15,
        marginTop: -15, // Adjust margin to fit nicely under the input field
    }
});

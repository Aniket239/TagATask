import React, { useEffect, useState } from "react";
import { View, TextInput, Button, StyleSheet, Modal, Pressable, Text, Alert, TouchableOpacity, ScrollView } from "react-native";
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-date-picker';
import { launchCamera } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';

interface Task {
    title: string;
    date: Date;  // Use Date object for consistency
    tag: string[];
    recurrence: string | null;
    comment: string;
    fileUri?: string; // Add optional file URI
    filenames: string[];  // Array of file names
    fileDatas: { name: string, data: string }[];  // Array of objects containing file name and base64 data
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
    const [fileUri, setFileUri] = useState<string | undefined>(taskData?.fileUri);
    const [isFocus, setIsFocus] = useState(false);
    const [titleError, setTitleError] = useState(false);
    const [pickedFiles, setPickedFiles] = useState<string[]>(taskData?.filenames || []); // Array to store the file names
    const [fileDataArray, setFileDataArray] = useState<{ name: string, data: string }[]>(taskData?.fileDatas || []); // Array to store base64 data
    const [isFileModalOpen, setIsFileModalOpen] = useState<boolean>(false); // State for file modal
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false); // Date picker state
    const [isTimePickerOpen, setIsTimePickerOpen] = useState(false); // Time picker state
    const [isTaskMenuOpen, setTaskMenuOpen] = useState(false); // State for task menu

    useEffect(() => {
        if (taskData) {
            setTitle(taskData.title);
            setDate(new Date(taskData.date));
            setTag(taskData.tag);
            setRecurrence(taskData.recurrence);
            setComment(taskData.comment);
            setFileUri(taskData.fileUri);
            setPickedFiles(taskData.filenames || []);
            setFileDataArray(taskData.fileDatas || []);
        }
    }, [taskData]);

    const resetForm = () => {
        setTitle("");
        setDate(new Date());
        setTag([]);
        setRecurrence(null);
        setComment("");
        setFileUri(undefined);
        setPickedFiles([]);
        setFileDataArray([]);
        setTitleError(false);
    };

    const handleDelete = () => {
        const task = { title: "", date: new Date(), tag: [], recurrence: null, comment: "", fileUri: "", filenames: [], fileDatas: [] };
        onSave(task);
        resetForm();
        onClose();
        setTaskMenuOpen(false);
    };

    const saveTask = () => {
        if (title.trim() === "") {
            setTitleError(true);
            return;
        }

        const task: Task = { title, date, tag, recurrence, comment, fileUri, filenames: pickedFiles, fileDatas: fileDataArray };
        onSave(task);
        resetForm();
        onClose();
    };


    const handleCameraLaunch = async (isCamera: boolean) => {
        const options = {
            mediaType: isCamera ? 'photo' : 'video',
        };

        try {
            const response = await launchCamera(options);
            console.log('pickedFile', response);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const uploadFileOnPressHandler = async () => {
        try {
            const pickedNewFiles = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
                allowMultiSelection: true,
            });

            // Filter out files with null names to avoid type errors
            const newUniqueFiles = pickedNewFiles.filter(file => file.name !== null && !pickedFiles.includes(file.name!));

            // Map the picked files and ensure names are valid strings
            const newFileNames: string[] = newUniqueFiles.map(file => file.name as string);

            // Append the new file names to the existing array of files
            setPickedFiles(prevFiles => [...prevFiles, ...newFileNames]);

            // Process and store base64 data for each new file
            const newFileDataArray = await Promise.all(newUniqueFiles.map(async (file) => {
                const fileData = await RNFS.readFile(file.uri, 'base64');
                return { name: file.name as string, data: fileData };
            }));

            // Append the new file data to the fileDataArray
            setFileDataArray(prevData => [...prevData, ...newFileDataArray]);

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User canceled the picker', err);
            } else {
                console.log('Unknown error', err);
                throw err;
            }
        }
    };

    const removeFile = (fileName: string) => {
        setPickedFiles(prevFiles => prevFiles.filter(file => file !== fileName));
        setFileDataArray(prevData => prevData.filter(file => file.name !== fileName));
    };

    const toggleMenu = () => {
        setTaskMenuOpen(!isTaskMenuOpen);
    };

    const closeMenu = () => {
        setTaskMenuOpen(false);
    };

    return (
        <Modal
            animationType="slide"
            visible={isOpenTask}
            onRequestClose={saveTask}
        >
            {isTaskMenuOpen && (
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={isTaskMenuOpen}
                    onRequestClose={closeMenu}
                >
                    <Pressable style={styles.menuOverlay} onPress={closeMenu}>
                        <View style={styles.menuContainer}>
                            <Pressable onPress={handleDelete} style={styles.deleteButton}>
                                <MaterialIcon name="delete" size={25} color={"#F7454A"} />
                                <Text style={styles.deleteButtonText}>Delete</Text>
                            </Pressable>
                        </View>
                    </Pressable>
                </Modal>
            )}
            <View style={styles.taskUpdate}>
                <Pressable onPress={saveTask}>
                    <MaterialIcon name="close" size={30} color="black" />
                </Pressable>
                <Pressable onPress={toggleMenu}>
                    <MaterialIcon name="more-vert" size={30} color="black" />
                </Pressable>
            </View>
            <ScrollView>
                <View style={styles.modalStyle}>
                    <View style={styles.inputContainer}>
                        {titleError && <Text style={styles.errorText}>Task name is required</Text>}
                        <TextInput
                            style={[styles.textInput, titleError && styles.errorInput]}
                            value={title}
                            onChangeText={(text) => {
                                setTitle(text);
                                setTitleError(false);
                            }}
                            editable={isOpenTask}
                            placeholder="Title"
                            placeholderTextColor={titleError ? "#ff6666" : "#666"}
                        />
                        <View style={styles.dateTimeContainer}>
                            <TouchableOpacity
                                style={styles.dateTouchable}
                                onPress={() => setIsDatePickerOpen(true)}>
                                <MaterialIcon name="calendar-month" size={30} color={"#5f6368"} />
                                <Text style={styles.dateTimeText}>{date.toLocaleDateString()}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.dateTouchable}
                                onPress={() => setIsTimePickerOpen(true)}>
                                <MaterialIcon name="schedule" size={30} color={"#5f6368"} />
                                <Text style={styles.dateTimeText}>{date.toLocaleTimeString()}</Text>
                            </TouchableOpacity>

                            <DatePicker
                                modal
                                theme="light"
                                mode="date"
                                open={isDatePickerOpen}
                                date={date}
                                onConfirm={(date) => {
                                    setIsDatePickerOpen(false);
                                    setDate(date);
                                }}
                                onCancel={() => setIsDatePickerOpen(false)}
                            />

                            <DatePicker
                                modal
                                theme="light"
                                mode="time"
                                open={isTimePickerOpen}
                                date={date}
                                onConfirm={(time) => {
                                    setIsTimePickerOpen(false);
                                    setDate(time);
                                }}
                                onCancel={() => setIsTimePickerOpen(false)}
                            />
                        </View>
                        <View style= {styles.label}>  
                            <MaterialIcon name="label-outline" size={30} color={"#5f6368"}/>
                            <MultiSelect
                                style={[styles.dropdown, isFocus && { borderColor: 'black' }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                data={data}
                                search
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder={!isFocus ? 'Label' : '...'}
                                searchPlaceholder="Search..."
                                value={tag}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={item => {
                                    setTag(item);
                                    setIsFocus(false);
                                }}
                                disable={!isOpenTask}
                                itemContainerStyle={styles.labelDropdownItemContainer}
                                itemTextStyle={styles.labelDropdownItemText}
                                activeColor="#cceeff"
                            />
                        </View>
                        <TextInput
                            style={[styles.textInput, { height: 60 }]}
                            value={comment}
                            onChangeText={setComment}
                            editable={isOpenTask}
                            placeholder="Comment"
                            placeholderTextColor="#666"
                            multiline={true}
                        />
                        <Dropdown
                            style={[styles.dropdown, isFocus && { borderColor: 'black' }]}
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
                            itemContainerStyle={styles.labelDropdownItemContainer}
                            itemTextStyle={styles.labelDropdownItemText}
                            activeColor="#cceeff"
                        />
                        <View style={styles.attachmentContainer}>
                            <Pressable onPress={() => setIsFileModalOpen(true)} >
                                <View style={styles.attachmentButton}>
                                    <View style={styles.attachmentContent}>
                                        <MaterialIcon name="attach-file" size={25} color="#5f6368" />
                                        <Text style={styles.attachmentTitle}>Attachments</Text>
                                    </View>
                                    <MaterialIcon name="add" size={35} color={"#5f6368"} />
                                </View>
                            </Pressable>
                            {pickedFiles.length > 0 && pickedFiles.map((fileName, index) => (
                                <View key={index} style={styles.fileItem}>
                                    <Text style={styles.attachmentText}>{fileName}</Text>
                                    <Pressable onPress={() => removeFile(fileName)}>
                                        <MaterialIcon name="delete" size={20} color="#F7454A" />
                                    </Pressable>
                                </View>
                            ))}
                        </View>
                    </View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={isFileModalOpen}
                        onRequestClose={() => setIsFileModalOpen(false)}
                    >
                        <Pressable style={styles.modalOverlay} onPress={() => setIsFileModalOpen(false)}>
                            <View style={styles.bottomModal}>
                                <Pressable onPress={() => { setIsFileModalOpen(false); handleCameraLaunch(true); }} style={styles.pressableButton}>
                                    <MaterialIcon name="photo-camera" size={30} color="#5f6368" />
                                    <Text style={styles.pressableText}>Take Photo</Text>
                                </Pressable>
                                <Pressable onPress={() => { setIsFileModalOpen(false); handleCameraLaunch(false); }} style={styles.pressableButton}>
                                    <MaterialIcon name="videocam" size={30} color="#5f6368" />
                                    <Text style={styles.pressableText}>Record Video</Text>
                                </Pressable>
                                <Pressable onPress={() => { setIsFileModalOpen(false); uploadFileOnPressHandler(); }} style={styles.pressableButton}>
                                    <MaterialIcon name="attach-file" size={30} color="#5f6368" />
                                    <Text style={styles.pressableText}>Upload File</Text>
                                </Pressable>
                            </View>
                        </Pressable>
                    </Modal>
                </View>
            </ScrollView>
        </Modal>
    );
};

export default NewTask;

const styles = StyleSheet.create({
    modalStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        paddingBottom: 23
    },
    menuOverlay: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-end', // Align the menu on the right
        paddingRight: 20,
        paddingTop: "15%"
    },
    menuContainer: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 8,
        elevation: 5, // For shadow effect
        width: 150,
    },
    deleteButton: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    deleteButtonText: {
        color: "red",
        fontSize: 20,
        marginLeft: 5
    },
    inputContainer: {
        width: "100%",
        height: "95%",
        paddingTop: 20, // Padding for the content within the modal
        paddingBottom: 20, // Padding for the content within the modal
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
        paddingVertical: 12,
        paddingHorizontal: 18,
        marginBottom: 20,
        backgroundColor: "#fff",
        fontSize: 18,
        borderColor: '#ccc',
    },
    dateTimeContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: "center",
        marginBottom: 20,
        width: "100%",
        borderColor: '#ccc', // Apply border color to TouchableOpacity
        borderWidth: 1, // Apply border width
        padding: 10, // Add padding to make it visually appealing
        paddingLeft: 17,
        marginRight: 20, // Add space between Date and Time
    },
    dateTouchable: {
        marginRight: 20, // Add space between Date and Time
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    dateTimeText: {
        fontSize: 18,
        color: "#333",
        marginLeft: 5
    },
    dropdown: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
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
        paddingHorizontal: 10,
    },
    label:{
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    labelDropdownItemContainer: {
        backgroundColor: "#fafafa",
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems: "center",
        width: "100%"
    },
    labelDropdownItemText: {
        color: "#333",
        fontSize: 16,
        width: "100%"
    },
    selectedItemContainer: {
        backgroundColor: "#e0f7fa",
    },
    attachmentContainer: {
        flexDirection: 'column', // Arrange items in a row
        backgroundColor: '#f9f9f9', // Background color for the button
        marginBottom: 20,
        borderWidth: 1, // Optional: Add border
        borderColor: '#ccc',
        padding: 10, // Add some padding for touchable area

    },
    attachmentButton: {
        flexDirection: 'row', // Arrange items in a row
        justifyContent: 'space-between', // Space between left and right content
        alignItems: 'center', // Align items vertically in the center
        backgroundColor: '#f9f9f9', // Background color for the button
    },
    attachmentContent: {
        flexDirection: 'row', // Arrange the icon and text in a row
        alignItems: 'center', // Vertically center the content
    },
    attachmentTitle: {
        fontSize: 18, // Font size for the text
        marginLeft: 5, // Add space between icon and text
        color: "#333", // Text color
    },
    attachmentText: {
        fontSize: 18, // Font size for the text
        marginLeft: 7, // Add space between icon and text
        color: "#333", // Text color
        flexDirection: "column"
    },
    fileItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        paddingRight: 7,
        marginTop: 10,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay background
    },
    bottomModal: {
        flexDirection: "column",
        backgroundColor: '#fff',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
    },
    pressableButton: {
        backgroundColor: "white",
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginVertical: 10,
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
    },
    pressableText: {
        marginLeft: 10,
        fontSize: 20,
        color: "black",
        fontWeight: "bold",
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

import React, { useEffect, useState } from "react";
import { View, TextInput, Button, StyleSheet, Modal, Pressable, Text, Alert, TouchableOpacity, ScrollView } from "react-native";
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-date-picker';
import { launchCamera } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';

interface Task {
    id: string;
    title: string;
    dueDate: Date;  // Use Date object for consistency
    tag: string[];
    recurrence: string | null;
    comment: string;
    fileUri?: string; // Add optional file URI
    filenames: string[];  // Array of file names
    fileDatas: { name: string, data: string }[];  // Array of objects containing file name and base64 data
    dateSet: boolean;
    status: "todo" | "tobeapproved" | "done";
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
    const defaultDate = new Date(); // This will set the default date as today's date
    const [title, setTitle] = useState(taskData?.title || "");
    const [dueDate, setDueDate] = useState<Date>(taskData?.dueDate ? new Date(taskData.dueDate) : defaultDate);
    const [dateSet, setDateSet] = useState<boolean>(taskData?.dateSet || false);;
    const [tag, setTag] = useState<string[]>(taskData?.tag || []);
    const [recurrence, setRecurrence] = useState<string | null>(taskData?.recurrence || null);
    const [comment, setComment] = useState(taskData?.comment || "");
    const [fileUri, setFileUri] = useState<string | undefined>(taskData?.fileUri);
    const [isFocus, setIsFocus] = useState(false);
    const [titleError, setTitleError] = useState(false);
    const [pickedFiles, setPickedFiles] = useState<string[]>(taskData?.filenames || []);
    const [fileDataArray, setFileDataArray] = useState<{ name: string, data: string }[]>(taskData?.fileDatas || []);
    const [isFileModalOpen, setIsFileModalOpen] = useState<boolean>(false);
    const [isDueDatePickerOpen, setIsDueDatePickerOpen] = useState(false);
    const [isDueTimePickerOpen, setIsDueTimePickerOpen] = useState(false);
    const [isTaskMenuOpen, setTaskMenuOpen] = useState(false);

    useEffect(() => {
        if (taskData) {
            setTitle(taskData.title);
            setDueDate(new Date(taskData.dueDate));
            setDateSet(taskData.dateSet);
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
        setDueDate(new Date("2024-01-01"));
        setTag([]);
        setRecurrence(null);
        setComment("");
        setFileUri(undefined);
        setPickedFiles([]);
        setFileDataArray([]);
        setTitleError(false);
    };

    const handleDelete = () => {
        const task = { title: "", dueDate: new Date(), tag: [], recurrence: null, comment: "", fileUri: "", filenames: [], fileDatas: [], dateSet: false };
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

        const task: Task = {
            id: taskData?.id,
            title,
            dueDate: dueDate, // Use startDate or dueDate as appropriate
            dateSet: dateSet,
            tag,
            recurrence,
            comment,
            fileUri,
            filenames: pickedFiles,
            fileDatas: fileDataArray,
            status: taskData?.status,
        };
        console.log('====================================');
        console.log(dateSet);
        console.log('====================================');
        console.log('====================================');
        console.log(taskData?.id);
        console.log('====================================');

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
            if (response.didCancel) {
                console.log('User cancelled camera launch');
                return;
            }
            if (response.errorCode) {
                console.error('Camera error:', response.errorMessage);
                return;
            }
            if (response.assets && response.assets.length > 0) {
                const newCapturedFiles = response.assets.map(asset => ({
                    uri: asset.uri || '',
                    name: asset.fileName || `captured_${Date.now()}.${isCamera ? 'jpg' : 'mp4'}`,
                }));
                const newFileNames: string[] = newCapturedFiles.map(file => file.name);
                setPickedFiles(prevFiles => [...prevFiles, ...newFileNames]);
                const newFileDataArray = await Promise.all(newCapturedFiles.map(async (file) => {
                    const fileData = await RNFS.readFile(file.uri, 'base64');
                    return { name: file.name, data: fileData };
                }));
                setFileDataArray(prevData => [...prevData, ...newFileDataArray]);
            }
        } catch (error) {
            console.error('Error launching camera:', error);
        }
    };


    const uploadFileOnPressHandler = async () => {
        try {
            const pickedNewFiles = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
                allowMultiSelection: true,
            });
            const newUniqueFiles = pickedNewFiles.filter(file => file.name !== null && !pickedFiles.includes(file.name!));
            const newFileNames: string[] = newUniqueFiles.map(file => file.name as string);
            setPickedFiles(prevFiles => [...prevFiles, ...newFileNames]);
            const newFileDataArray = await Promise.all(newUniqueFiles.map(async (file) => {
                const fileData = await RNFS.readFile(file.uri, 'base64');
                return { name: file.name as string, data: fileData };
            }));
            setFileDataArray(prevData => [...prevData, ...newFileDataArray]);
            console.log('====================================');
            console.log(pickedFiles);
            console.log('====================================');
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
                            style={[styles.taskName, titleError && styles.errorInput]}
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
                            <View style={styles.dueDateTimeContainer}>
                                <Text style={styles.dueDateText}>Due Date... </Text>
                                <TouchableOpacity
                                    style={styles.dateTouchable}
                                    onPress={() => setIsDueDatePickerOpen(true)}>
                                    <MaterialIcon name="calendar-month" size={30} color={"#5f6368"} />
                                    <Text style={styles.dateTimeText}>{dateSet ? dueDate.toLocaleDateString() : ""}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.dateTouchable}
                                    onPress={() => setIsDueTimePickerOpen(true)}>
                                    <MaterialIcon name="schedule" size={30} color={"#5f6368"} />
                                    <Text style={styles.dateTimeText}>{dateSet ? dueDate.toLocaleTimeString() : ""}</Text>
                                </TouchableOpacity>

                                {/* Due Date Picker */}
                                <DatePicker
                                    modal
                                    theme="light"
                                    mode="date"
                                    minimumDate={new Date()}  // Set today's date as the minimum
                                    open={isDueDatePickerOpen}
                                    date={dueDate}
                                    onConfirm={(date) => {
                                        setIsDueDatePickerOpen(false);
                                        setDueDate(date);
                                        setDateSet(true);
                                    }}
                                    onCancel={() => {
                                        setIsDueDatePickerOpen(false);
                                    }
                                    }
                                />

                                {/* Due Time Picker */}
                                <DatePicker
                                    modal
                                    theme="light"
                                    mode="time"
                                    open={isDueTimePickerOpen}
                                    date={dueDate}
                                    onConfirm={(time) => {
                                        setIsDueTimePickerOpen(false);
                                        setDueDate(time);
                                        setDateSet(true);
                                    }}
                                    onCancel={() => { setIsDueTimePickerOpen(false)                                     
                                    }}
                                />
                                {dateSet?<Pressable onPress={()=>setDateSet(false)}>
                                    <MaterialIcon name="restart-alt" size={30} color={'#5f6368'} />
                                </Pressable>:<></>}
                                
                            </View>
                        </View>
                        <View style={styles.labelTitle}>
                            <View style={styles.labelIcon}>
                                <MaterialIcon name="label-outline" size={35} color={"#5f6368"} />
                            </View>
                            <View style={styles.label}>
                                <MultiSelect
                                    style={[styles.dropdown, isFocus && { borderColor: 'black' }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    data={data}
                                    search
                                    // maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    placeholder={!isFocus ? 'Label' : 'Select Label'}
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
                                    activeColor="lightgrey"
                                />
                            </View>
                        </View>
                        <View style={styles.comment}>
                            <MaterialIcon name="chat" size={30} color={"#5f6368"} />
                            <TextInput
                                style={[styles.commentText, { height: 60 }]}
                                value={comment}
                                onChangeText={setComment}
                                editable={isOpenTask}
                                placeholder="Comment"
                                placeholderTextColor="black"
                                multiline={true}
                            />
                        </View>
                        <View style={styles.reoccurenceTitle}>
                            <MaterialIcon name="all-inclusive" size={28} color={"#5f6368"} />
                            <Dropdown
                                style={[styles.dropdown, isFocus && { borderColor: 'black' }]}
                                placeholderStyle={styles.reoccurencePlaceholderStyle}
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
                        </View>
                        <View style={styles.attachmentContainer}>
                            <Pressable onPress={() => setIsFileModalOpen(true)} >
                                <View style={styles.attachmentButton}>
                                    <View style={styles.attachmentContent}>
                                        <MaterialIcon name="attach-file" size={30} color="#5f6368" />
                                        <Text style={styles.attachmentTitle}>Attachments</Text>
                                    </View>
                                    <MaterialIcon name="add" size={35} color={"#5f6368"} />
                                </View>
                            </Pressable>
                            {pickedFiles.length > 0 && pickedFiles.map((fileName, index) => (
                                <View key={index} style={styles.fileItem}>
                                    <Text style={styles.attachmentText}>{fileName}</Text>
                                    <Pressable onPress={() => removeFile(fileName)}>
                                        <MaterialIcon name="close" size={30} color="#5f6368" />
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
        paddingBottom: "2%"
    },
    menuOverlay: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-end', // Align the menu on the right
        paddingRight: "2%",
        paddingTop: "15%"
    },
    menuContainer: {
        backgroundColor: "#fff",
        padding: "2%",
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
        alignSelf: "center", // Center the content horizontally
    },
    taskName: {
        paddingLeft: "3%",
        color: "black",
        fontSize: 30,
        marginBottom: "1.5%",
    },
    taskUpdate: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20,
        paddingBottom: 13,
        backgroundColor: "lightgrey"
    },

    dateTimeContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: "center",
        marginBottom: "1.5%",
        width: "100%",
        borderColor: '#ccc', // Apply border color to TouchableOpacity
        borderWidth: 1, // Apply border width
        marginRight: 20, // Add space between Date and Time
    },
    startDateTimeContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: "center",
        width: "100%",
        borderBottomWidth: 1,
        padding: 10, // Add padding to make it visually appealing
        borderBottomColor: "#ccc"
    },
    dueDateTimeContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: "center",
        width: "100%",
        padding: 10, // Add padding to make it visually appealing
        paddingLeft: "3%",

    },
    startDateText: {
        fontSize: 18,
        paddingLeft: "1%",
        color: "black",
    },
    dueDateText: {
        fontSize: 20,
        paddingLeft: "1%",
        paddingRight: "0.5%",
        color: "black",
    },
    timeText: {
        fontSize: 18,
        paddingLeft: "1%",
        color: "black",
    },
    dateTouchable: {
        marginRight: 20, // Add space between Date and Time
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    dateTimeText: {
        fontSize: 18,
        color: "black",
        marginLeft: 5
    },
    labelTitle: {
        flexDirection: "row", // Arrange the label and icon in a row
        justifyContent: "flex-start",
        alignItems: "flex-start",
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: "1.5%",
        paddingLeft: "3%"
    },
    labelIcon: {
        marginTop: "2%"
    },
    label: {
        flexDirection: "column", // Arrange the label and icon in a row
        width: "100%",
    },
    dropdown: {
        height: 50,
        paddingHorizontal: "2%",
        backgroundColor: "#fff",
        color: "black",
        width: "90%",
        flexDirection: "column",
    },
    labelDropdownItemContainer: {
        backgroundColor: "#fafafa",
        alignItems: "center",
        width: "100%",
    },
    labelDropdownItemText: {
        color: "black",
        fontSize: 16,
        width: "100%",
    },
    placeholderStyle: {
        fontSize: 20,
        color: "black",
    },
    reoccurencePlaceholderStyle:{
        fontSize: 20,
        color: "black",
        paddingLeft: "1.5%"
    },
    selectedTextStyle: {
        fontSize: 18,
        color: "black",
        flexDirection: "column"
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        color: "black",
        backgroundColor: "#f9f9f9",
        paddingHorizontal: 10,
    },
    selectedItemContainer: {
        backgroundColor: "grey",
    },
    comment: {
        color: "black",
        borderWidth: 1,
        paddingLeft: "3%",
        marginBottom: "1.5%",
        backgroundColor: "#fff",
        borderColor: '#ccc',
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    commentText: {
        fontSize: 20,
        paddingLeft: "3%",
        color: "black",
        width: "95%",
    },
    reoccurenceTitle: {
        flexDirection: "row", // Arrange the label and icon in a row
        justifyContent: "flex-start",
        alignItems: "center",
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: "1.5%",
        paddingLeft: "3%",
        fontSize: 18, // Font size for the text
    },
    attachmentContainer: {
        flexDirection: 'column', // Arrange items in a row
        backgroundColor: '#fff', // Background color for the button
        marginBottom: 20,
        borderWidth: 1, // Optional: Add border
        borderColor: '#ccc',
        padding: 10, // Add some padding for touchable area
        paddingLeft: "3%"

    },
    attachmentButton: {
        flexDirection: 'row', // Arrange items in a row
        justifyContent: 'space-between', // Space between left and right content
        alignItems: 'center', // Align items vertically in the center
        backgroundColor: '#fff', // Background color for the button
        paddingRight: "0.5%"
    },
    attachmentContent: {
        flexDirection: 'row', // Arrange the icon and text in a row
        alignItems: 'center', // Vertically center the content
    },
    attachmentTitle: {
        fontSize: 20, // Font size for the text
        marginLeft: 5, // Add space between icon and text
        color: "black", // Text color
        paddingLeft: "1.7%"
    },
    attachmentText: {
        fontSize: 18, // Font size for the text
        marginLeft: 7, // Add space between icon and text
        color: "black", // Text color
        flexDirection: "column",
        maxWidth: "80%"
    },
    fileItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        paddingRight: 5,
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
        fontSize: 18,
        color: "black",
    },
    errorInput: {
        borderColor: "#ff6666", // Red border color to indicate error
    },
    errorText: {
        color: "#ff6666", // Red text color for error message
        marginBottom: 15,
        marginTop: -5, // Adjust margin to fit nicely under the input field
        marginLeft: 10
    }
});

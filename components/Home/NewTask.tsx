import React, { useState } from "react";
import {
    View,
    Image,
    StyleSheet,
    Modal,
    TextInput,
    TouchableOpacity,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
interface Task {
    title: string;
    task: string;
}

interface NewTaskProps {
    addTask: (task: Task) => void;
}

const NewTask: React.FC<NewTaskProps> = ({ addTask }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [task, setTask] = useState('');

    const handlePress = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        if (title || task) {
            addTask({ title, task });
        }
        setTitle('');
        setTask('');
        setModalVisible(false);
    };

    const handleBackdropPress = () => {
        Keyboard.dismiss();
        closeModal();
    };
    const handleNoBackdropPress = () =>{
        return;
    }

    return (
        <View>
            <TouchableOpacity onPress={handlePress}>
                <Image
                    style={styles.plusIcon}
                    source={require("../../assets/add-task.png")}
                />
            </TouchableOpacity>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <TouchableWithoutFeedback onPress={handleBackdropPress}>
                    <View style={styles.modalContainer}>
                        <TouchableWithoutFeedback onPress={handleNoBackdropPress}>
                            <View style={styles.modalContent}>
                                <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                                    <Text style={styles.closeText}>×</Text>
                                </TouchableOpacity>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Title"
                                    placeholderTextColor="#aaa"
                                    value={title}
                                    onChangeText={setTitle}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="+ Add Task"
                                    placeholderTextColor="#aaa"
                                    multiline
                                    value={task}
                                    onChangeText={setTask}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    plusIcon: {
        width: 50,
        height: 50,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        width: "80%",
        padding: 20,
        backgroundColor: "white",
        borderRadius: 10,
    },
    closeButton: {
        position: "absolute",
        top: 5,
        right: 20,
    },
    closeText: {
        fontSize: 30,
        color: "black",
    },
    input: {
        width: "100%",
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginTop: 20,
        color: "black",
    },
});

export default NewTask;

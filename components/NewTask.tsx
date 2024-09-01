import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';

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

const NewTask = (props: { isEditable: boolean | ((prevState: boolean) => boolean); }) => {
    const [title, setTitle] = React.useState("");
    const [date, setDate] = React.useState("");
    const [tag, setTag] = React.useState<string[]>([]);  // Managing as an array for MultiSelect
    const [recurrence, setRecurrence] = React.useState<string | null>(null);
    const [comment, setComment] = React.useState("");
    const [isEditable, setIsEditable] = React.useState(false);
    const [isFocus, setIsFocus] = React.useState(false);

    const showInputs = () => {
        setIsEditable(true);
    };

    const handleDelete = () => {
        setTitle("");
        setDate("");
        setTag([]);
        setRecurrence(null);
        setComment("");
    };

    React.useEffect(() => {
        setIsEditable(props.isEditable);
    });

    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.textInput}
                value={title}
                onChangeText={setTitle}
                editable={isEditable}
                placeholder="Title"
                placeholderTextColor="#666"
            />
            <TextInput
                style={styles.textInput}
                value={date}
                onChangeText={setDate}
                editable={isEditable}
                placeholder="Date (e.g., 2024-09-01 10:00 AM)"
                placeholderTextColor="#666"
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
                disable={!isEditable}
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
                disable={!isEditable}
                itemContainerStyle={styles.dropdownItemContainer}
                itemTextStyle={styles.dropdownItemText}
                activeColor="#cceeff"
            />
            <TextInput
                style={[styles.textInput, { height: 60 }]}
                value={comment}
                onChangeText={setComment}
                editable={isEditable}
                placeholder="Comment"
                placeholderTextColor="#666"
                multiline={true}
            />
            <Button
                title="Delete"
                color="red"
                onPress={handleDelete}
                disabled={!isEditable}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        width: "100%",
    },
    textInput: {
        color: "black",
        borderWidth: 1,
        borderColor: "black",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        marginBottom: 15,
        backgroundColor: "#fff",
        fontSize: 16,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: "#fff",
        color: "black",
    },
    placeholderStyle: {
        fontSize: 16,
        color: "black",
    },
    selectedTextStyle: {
        fontSize: 16,
        color: "black",
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        color: "black",
        backgroundColor: "#fff",
    },
    dropdownItemContainer: {
        backgroundColor: "#f2f2f2", // Light gray background for dropdown items
    },
    dropdownItemText: {
        color: "black", // Ensuring the text is black on light background
    },
    selectedItemContainer: {
        backgroundColor: "#cceeff", // Light blue background for selected items
    },
    selectedItemText: {
        color: "#003366", // Dark blue text color for selected items
    },
});

export default NewTask;

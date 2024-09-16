import React, { useEffect, useState } from "react";
import { View, TextInput, Text, StyleSheet, Pressable } from "react-native";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const Login = ({ onLogin }: { onLogin: (username: string, password: string) => boolean }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [loginError, setLoginError] = useState(false); // State to manage login error

    useEffect(() => {
        setLoginError(false); // Reset error state when username or password changes
    }, [username, password]);
    
    const remember = () => {
        setRememberMe(prevState => !prevState); // Toggle the rememberMe state correctly
    }

    const handleLoginPress = () => {
        const success = onLogin(username, password); // onLogin now returns boolean
        if (!success) {
            setLoginError(true); // Set loginError to true if login fails
        } else {
            setLoginError(false); // Reset the loginError if login succeeds
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.loginHeader}>Login</Text>

            <Text style={styles.label}>Username</Text>
            <TextInput
                style={[
                    styles.input,
                    loginError ? styles.errorInput : null // Apply error style if login fails
                ]}
                placeholder="Enter your username"
                value={username}
                onChangeText={setUsername}
                placeholderTextColor="#a1a1a1"
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
                style={[
                    styles.input,
                    loginError ? styles.errorInput : null // Apply error style if login fails
                ]}
                placeholder="Enter your password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                placeholderTextColor="#a1a1a1"
            />

            {loginError && <Text style={styles.errorText}>Incorrect username or password</Text>}

            <View style={styles.loginButtonContainer}>
                <Pressable style={styles.rememberMeContainer} onPress={remember}>
                    <MaterialIcon
                        name={rememberMe ? "check-box" : "check-box-outline-blank"}
                        size={24}
                        color={"#a1a1a1"}
                    />
                    <Text style={styles.rememberMeText}>Remember Me</Text>
                </Pressable>
                <Pressable onPress={handleLoginPress} style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: "8%",
        paddingBottom: "40%",
        justifyContent: 'center',
        backgroundColor: "#f5f5f7",
    },
    loginHeader: {
        color: "#333",
        fontSize: 32,
        marginBottom: 35,
        fontWeight: "700",
        textAlign: "center",
    },
    label: {
        color: "#333",
        fontSize: 16,
        marginBottom: 10,
        fontWeight: "600",
        paddingLeft: "1%",
    },
    input: {
        color: "black",
        borderColor: '#e0e0e0',
        backgroundColor: '#fff',
        borderWidth: 1,
        padding: 12,
        marginBottom: 15,
        borderRadius: 8,
        fontSize: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 1, // Adds subtle shadow effect for Android
    },
    loginButtonContainer: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    rememberMeContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 20,
    },
    rememberMeText: {
        fontSize: 16,
        color: "#555",
        paddingLeft: "2%",
    },
    loginButton: {
        width: "80%",
        backgroundColor: "#4a90e2",
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: "center",
        shadowColor: '#4a90e2',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 3,
    },
    loginButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
    errorInput: {
        borderColor: 'red', // Red border for error
    },
    errorText: {
        color: 'red',
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 14,
    },
});

export default Login;

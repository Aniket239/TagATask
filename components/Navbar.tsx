import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

function openSideNav() {
    // Your code to open the side navigation
}

const Navbar = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={openSideNav} style={styles.iconButton}>
                <MaterialIcon name="menu" size={30} color="black" />
            </TouchableOpacity>
            <Text style={styles.innerText}>Logo</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        padding: 10,
    },
    innerText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 25,
        marginLeft: 10,
    },
});

export default Navbar;

import React from "react";
import { View, Text,Image, StyleSheet } from "react-native";

const Navbar = () => {
    return (
        <View style={{
            backgroundColor: 'white',
            padding: 10,
        }}>
            <Text style={styles.innerText}> Logo</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    innerText:{
        color:'black',
        fontWeight: 'bold',
        fontSize: 25
    }
});

export default Navbar;
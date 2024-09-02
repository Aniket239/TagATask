import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Navbar = () => {
    return (
        <View style={{
            flexDirection: 'row',
        }}>
            <View style={{
                backgroundColor: 'white',
                padding: 10,
            }}>
                <span class="material-symbols-outlined">
                    menu
                </span>
            </View>
            <View style={{
                backgroundColor: 'white',
                padding: 10,
            }}>
                <Text style={styles.innerText}> Logo</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    innerText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 25
    }
    <style>
        .material - symbols - outlined {
            font- variation - settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24
}
</style >
});

export default Navbar;
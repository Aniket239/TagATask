import React, { useState } from "react";
import { View, ScrollView, Dimensions, StyleSheet } from "react-native";
import ToDo from "../components/ToDo";
import ToBeApproved from "../components/ToBeApproved";
import Done from "../components/Done";
import ToolNavbar from "../components/ToolNavbar";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {useSelector } from "react-redux";

const { width } = Dimensions.get("window");

const Home = () => {

    const scrollStatus = useSelector((state)=>state.scrolling.value)
    console.log(scrollStatus);

    return (
        <>
            <ToolNavbar />
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyboardDismissMode='on-drag'
                scrollEnabled={scrollStatus} // Disable horizontal scroll when dragging
                style={{ flex: 1 }}
            >
                <View style={{ width: width, justifyContent: 'flex-start', alignItems: 'center' }}>
                    <GestureHandlerRootView style={styles.container}>
                        <ToDo />
                    </GestureHandlerRootView>
                </View>
                <View style={{ width: width, justifyContent: 'flex-start', alignItems: 'center' }}>
                    <GestureHandlerRootView style={styles.container}>
                        <ToBeApproved />
                    </GestureHandlerRootView>
                </View>
                <View style={{ width: width, justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Done />
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "98%"
    },
});

export default Home;

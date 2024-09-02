import React from "react";
import { View, ScrollView, Dimensions } from "react-native";
import ToDo from "../components/ToDo";
import ToBeApproved from "../components/ToBeApproved";
import Done from "../components/Done";
import ToolNavbar from "../components/ToolNavbar";

const { width } = Dimensions.get("window");

const Home = () => {
    return (
        <>
        <ToolNavbar/>
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyboardDismissMode='on-drag'
                style={{ flex: 1 }}
            >
                <View style={{ width: width, justifyContent: 'flex-start', alignItems: 'center' }}>
                    <ToDo />
                </View>
                <View style={{ width: width, justifyContent: 'flex-start', alignItems: 'center' }}>
                    <ToBeApproved />
                </View>
                <View style={{ width: width, justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Done />
                </View>
            </ScrollView>
        </>

    );
};

export default Home;

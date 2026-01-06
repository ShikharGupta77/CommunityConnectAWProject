/*
This document loads the page that allows users to decide
whether they want to upload a BeKind post or a shared resource post.
It defines the appropriate buttons and styles them.
*/
import { Text, View, Button } from "react-native";
import PostTypeCard from "../components/PostTypeCard";
import Navbar from "../components/Navbar";
import { StyleSheet } from "react-native";

export default function ChoosePostType({ navigation }) {
    return (
        <>
            <View style={styles.space} />
            <View style={{ display: "flex", alignItems: "center" }}>
                <PostTypeCard
                    title="Post a Resource"
                    content="Post a resource here for your community to borrow. Help a neighbor out!"
                    navigation={navigation}
                />
                <PostTypeCard
                    title="Post a BeKind"
                    content="Do some service for your community! Post a BeKind in the moment and spread some positivity!"
                    navigation={navigation}
                />
            </View>
            <Navbar />
        </>
    );
}

const styles = StyleSheet.create({
    space: {
        width: 20, // or whatever size you need
        height: 40,
    },
});

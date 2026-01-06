import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import * as Linking from "expo-linking";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Navbar from "./Navbar";

// A card to see posts
export default function PostCard(props) {
    const navigation = useNavigation();
    function callPeople() {
        Linking.openURL("tel:" + props.phone);
    }

    function openInfo() {
        navigation.navigate("Item Details", props);
    }

    return (
        <View>
            <Card
                containerStyle={{
                    borderRadius: "20px",
                    borderWidth: 2,
                    borderColor: "black",
                }}
            >
                <Card.Image
                    source={{
                        uri: props.link,
                    }}
                    containerStyle={{ alignItems: "center" }}
                    style={{
                        resizeMode: "center",
                        objectFit: "contain",
                    }}
                />
                <Card.Divider color="white" />
                <Card.Title h3Style={{ color: "lightblue" }} h3>
                    {props.title}
                </Card.Title>

                {/* <Card.Divider color="white" /> */}
                <View style={[styles.container, { flexDirection: "row" }]}>
                    <View style={{ flex: 1 }}>
                        <Pressable
                            style={styles.button}
                            title="Button 1"
                            raised
                            onPress={callPeople}
                        >
                            <Icon
                                name="phone"
                                type="font-awesome"
                                color="white"
                            />
                        </Pressable>
                    </View>
                    <View style={styles.space} />
                    <View style={{ flex: 1 }}>
                        <Pressable
                            style={styles.button}
                            title="Button 2"
                            raised
                            onPress={openInfo}
                        >
                            <Icon
                                name="info"
                                type="font-awesome"
                                color="white"
                            />
                        </Pressable>
                    </View>
                </View>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    space: {
        width: 20, // or whatever size you need
        height: 20,
    },
    button: {
        borderRadius: "15px",
        backgroundColor: "lightblue",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 32,
        elevation: 3,
        borderWidth: 2,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "white",
    },
});

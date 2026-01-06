import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import * as Linking from "expo-linking";
import { Alert } from "react-native";

// The component for when you click the i button on a card
export default function ExpandedPostCard({ route, navigation }) {
    function callPeople() {
        Linking.openURL("tel:" + route.params.phone);
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
                        uri: route.params.link,
                    }}
                    containerStyle={{ alignItems: "center" }}
                    style={{
                        resizeMode: "center",
                        objectFit: "contain",
                    }}
                />
                <Card.Divider color="white" />
                <Card.Divider color="white" />
                <Card.Title
                    h2Style={{
                        color: "lightblue",
                        fontWeight: "bold",
                        fontSize: 35,
                    }}
                    h2
                >
                    {route.params.title}
                </Card.Title>

                <View style={[styles.container, { flexDirection: "row" }]}>
                    <View style={{ flex: 0.25 }}>
                        <Card.Image
                            source={{
                                uri: "https://cdn0.iconfinder.com/data/icons/communication-456/24/account_profile_user_contact_person_avatar_placeholder-512.png",
                            }}
                            style={{
                                maxWidth: 40,
                                alignSelf: "center",
                                resizeMode: "center",
                                objectFit: "contain",
                            }}
                        ></Card.Image>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text
                            style={{
                                fontSize: 25,
                                fontWeight: "bold",
                            }}
                        >
                            {route.params.username}
                            {"\n"}
                            <Text
                                style={{ fontSize: 12, fontWeight: "regular" }}
                            >
                                Community Credit Points: {route.params.ccp}
                            </Text>
                        </Text>
                    </View>
                </View>
                <Card.Divider color="white" />

                <Text style={{ fontSize: 20 }}>
                    Description: {route.params.description}
                </Text>

                <Card.Divider color="white" />
                <Card.Divider color="white" />

                <Pressable
                    style={styles.button}
                    title="Button 1"
                    raised
                    onPress={callPeople}
                >
                    <Icon name="phone" type="font-awesome" color="white" />
                </Pressable>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        maxHeight: 70,
    },
    image: {},
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

import { Text, Button, View, StyleSheet, Dimensions } from "react-native";
import { Alert } from "react-native";
import BeKind from "../pages/BeKind";
import Resources from "../pages/Resources";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../lib/firebase";
import { useEffect, useState } from "react";

// Navbar component
export default function Navbar({ navigation }) {
    const [loggedIn, setLoggedIn] = useState(true);
    useEffect(() => {
        /*auth.onAuthStateChanged((user) => {
            if (auth.user) setLoggedIn(true);
            else {
                setLoggedIn(false);
            }
        });*/
    }, []);
    const nav = useNavigation();
    return (
        <View style={styles.container}>
            {loggedIn && (
                <Button
                    buttonStyle={styles.button}
                    title="BeKind"
                    onPress={() => nav.navigate("BeKind")}
                />
            )}

            {loggedIn && (
                <Button
                    style={styles.button}
                    title="+"
                    onPress={() => nav.navigate("ChoosePostType")}
                />
            )}

            {loggedIn && (
                <Button
                    style={styles.button}
                    title="Resources"
                    onPress={() => nav.navigate("Resources")}
                />
            )}
            {loggedIn && (
                <Button
                    style={styles.button}
                    title="Logout"
                    onPress={() => Alert.alert(JSON.stringify(auth.user))}
                />
            )}
            {!loggedIn && (
                <Button
                    style={styles.button}
                    title="Login"
                    onPress={() => nav.navigate("Login")}
                />
            )}

            {!loggedIn && (
                <Button
                    style={styles.button}
                    title="Signup"
                    onPress={() => nav.navigate("Signup")}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 0,
        height: 80,
        width: "100%",
        display: "flex",
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: "lightblue",
        color: "black",
        alignContent: "center",
        justifyContent: "space-evenly",
        borderRadius: 15,
        paddingTop: 15,
        paddingBottom: 15,
        borderWidth: 2,
    },
    button: {
        borderColor: "black",
        color: "red",
        fontSize: 30,
    },
});

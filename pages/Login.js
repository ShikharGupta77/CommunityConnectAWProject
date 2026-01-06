import React, { FC, useEffect, useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import {
    NavigationParams,
    NavigationScreenProp,
    NavigationState,
} from "@react-navigation/native";
import Navbar from "../components/Navbar";

import { auth } from "../lib/firebase";

const Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        if (email.length > 0 && password.length > 0) setDisabled(false);
        else setDisabled(true);
    }, [email, password]);

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigation.navigate("Resources");
            })
            .catch((error) => {
                Alert.alert(error.code);
                if (error.code === "auth/invalid-email")
                    Alert.alert("You did not enter a valid Email");
                else if (error.code === "auth/user-not-found")
                    Alert.alert("This user could not be found");
                else if (error.code === "auth/wrong-password")
                    Alert.alert("Invalid Password");
            });
    };

    return (
        <>
            {/* <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                    marginTop: 40,
                    marginLeft: 20,
                    marginVertical: 20,
                }}
            >
                <Text
                    style={{
                        fontWeight: "800",
                        fontSize: 24,
                    }}
                >
                    ←
                </Text>
            </TouchableOpacity> */}
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Email"
                        value={email.toLowerCase()}
                        onChangeText={(text) => setEmail(text.toLowerCase())}
                        style={styles.input}
                        autoCorrect
                        keyboardType="visible-password"
                    />
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        style={styles.input}
                        secureTextEntry
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={{
                            ...styles.button,
                            backgroundColor: disabled
                                ? "rgba(31, 31, 31, 0.12)"
                                : "lightblue",
                        }}
                        disabled={disabled}
                        onPress={handleLogin}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
            <Navbar />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    inputContainer: {
        width: "75%",
    },
    input: {
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: "70%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
    },
    button: {
        // backgroundColor: "#7f67be",
        width: "100%",
        padding: 15,
        borderRadius: 30,
        alignItems: "center",
    },
    buttonOutline: {
        backgroundColor: "white",
        marginTop: 5,
        // borderColor: "#7f67be",
        borderWidth: 2,
    },
    buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 16,
    },
    buttonOutlineText: {
        color: "#0782F9",
        fontWeight: "700",
        fontSize: 16,
    },
});

export default Login;

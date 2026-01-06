import { createUserWithEmailAndPassword } from "firebase/auth";
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
import { auth } from "../lib/firebase";
import { db } from "../lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Navbar from "../components/Navbar";

const Signup: FC<Props> = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [phoneNum, setPhoneNum] = useState("");
    const [thisName, setThisName] = useState("");

    useEffect(() => {
        if (
            email.length > 0 &&
            password.length > 0 &&
            thisName.length > 0 &&
            phoneNum.length > 0
        )
            setDisabled(false);
        else setDisabled(true);
    }, [email, password, thisName, phoneNum]);

    const handleSubmit = async () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (creds) => {
                const user = creds.user;
                const userRef = doc(db, "users", user.uid);
                await setDoc(userRef, {
                    name: thisName,
                    phoneNumber: phoneNum,
                    ccp: 0,
                });
                navigation.navigate("Resources");
            })
            .catch((error) => {
                Alert.alert(JSON.stringify(error));
                if (error.code === "auth/email-already-in-use") {
                    Alert.alert("It looks like this user already exists!");
                } else {
                    Alert.alert(error.code);
                }
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
                        placeholder="Name"
                        value={thisName.toLowerCase()}
                        onChangeText={(text) => setThisName(text.toLowerCase())}
                        style={styles.input}
                        autoCorrect
                        keyboardType="visible-password"
                    />
                    <TextInput
                        placeholder="Phone Number"
                        value={phoneNum.toLowerCase()}
                        onChangeText={(text) => setPhoneNum(text.toLowerCase())}
                        style={styles.input}
                        autoCorrect
                        keyboardType="visible-password"
                    />
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
                        onPress={() => handleSubmit()}
                    >
                        <Text style={styles.buttonText}>Sign up</Text>
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

export default Signup;

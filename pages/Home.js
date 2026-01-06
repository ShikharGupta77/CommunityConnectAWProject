import { Text, Button, View, StyleSheet, Pressable } from "react-native";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../lib/firebase";
import { useEffect, useState } from "react";
import { Card, ListItem, Icon } from "react-native-elements";
import Navbar from "../components/Navbar";

export default function Home() {
    return (
        // <View>
        /* <Text styles={styles.motto}>
                Volunteers do not necessarily have the time; they just have the
                heart
            </Text> */
        <>
            <Card
                containerStyle={{
                    borderRadius: 15,
                    marginTop: 40,
                    borderWidth: "2",
                    borderColor: "darkblue",
                }}
            >
                <Text style={styles.bigquote}>
                    "There is no power for change greater than a{" "}
                    <Text style={{ color: "purple" }}>community </Text>
                    discovering what it cares about." {"\n\n"} ~Margaret J.
                    Wheatley
                </Text>
            </Card>
            <Card
                containerStyle={{
                    borderRadius: 15,
                    marginTop: 20,
                    borderWidth: "2",
                    borderColor: "darkblue",
                }}
            >
                <Text style={styles.quote}>
                    Make a Difference.{" "}
                    <Text style={{ color: "purple" }}>Be Kind. </Text>
                </Text>
            </Card>

            <Text style={styles.secondary}> </Text>

            <Navbar />
        </>
    );
}

const styles = StyleSheet.create({
    bigquote: {
        justifyContent: "center",
        alignContent: "center",

        fontWeight: "bold",
        fontSize: 30,
        margin: 10,
    },
    quote: {
        justifyContent: "center",
        alignContent: "center",
        color: "lightblue",
        fontWeight: "bold",
        fontSize: 32,
        margin: 10,
    },
    quoteCard: {
        borderRadius: 15,
    },
});

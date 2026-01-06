import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    Button,
    Alert,
} from "react-native";
import Navbar from "./Navbar";

// A type of post card
export default function PostTypeCard(props) {
    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() =>
                        props.navigation.navigate("AddImage", {
                            title: props.title,
                        })
                    }
                >
                    <View style={styles.text}>
                        <Text style={styles.title}>{props.title}</Text>
                        <Text style={styles.content}>{props.content}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 250,
        marginLeft: 50,
        marginRight: 50,
        marginTop: 10,
        marginBottom: 50,
        backgroundColor: "lightblue",
        borderRadius: 15,
        borderWidth: 2,
    },
    text: {
        padding: 40,
        alignContent: "center",
        justifyContent: "center",
    },
    title: {
        fontWeight: "bold",
        fontSize: 30,
        paddingBottom: 20,
        textAlign: "center",
        textAlignVertical: "center",
        justifyContent: "center",
    },
    content: {
        fontSize: 15,
        textAlign: "center",
        textAlignVertical: "center",
        justifyContent: "center",
    },
});

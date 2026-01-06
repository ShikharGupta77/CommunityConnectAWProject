// This component is a for the conditional rendering of the Camera Selection page.

import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Image,
    Modal,
    Button,
    TextInput,
} from "react-native";
import { RNCamera } from "react-native-camera";
import { useState, useRef } from "react";
import { Camera, CameraType } from "expo-camera";
import {
    doc,
    setDoc,
    getDoc,
    collection,
    getCountFromServer,
} from "firebase/firestore";
import { db, auth } from "../lib/firebase";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import Navbar from "../components/Navbar";

export default function AddImage({ route, navigation }) {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [photo, setPhoto] = useState(null);
    const camera = useRef(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const isResources = true;
    const { title } = route.params;
    const storage = getStorage();
    const [postTitle, setPostTitle] = useState("");
    const [postDesc, setPostDesc] = useState("");

    // Changes the camera type in the app
    function toggleCameraType() {
        setType((current) =>
            current === CameraType.back ? CameraType.front : CameraType.back
        );
    }

    // Function to take a picture
    function takePicture() {
        camera.current.pausePreview();
        camera.current.takePictureAsync({
            onPictureSaved: (cameraPhoto) => {
                setIsModalVisible(true);
                setPhoto(cameraPhoto.uri);
                //Alert.alert(title);
            },
        });
    }

    // Uploads image to firebase backend
    async function uploadImage(type) {
        const docSnap = collection(db, "users", "testUser", type);
        const snap = await getCountFromServer(docSnap);
        const count = snap.data().count;
        if (type == "beReal") {
            await setDoc(
                doc(db, "users", "testUser", "beReal", `${count + 1}`),
                {
                    numUpvotes: 0,
                    timePosted: new Date().getDate(),
                }
            );
        } else if (type == "borrowItems") {
            await setDoc(
                doc(db, "users", "testUser", "borrowItems", `${count + 1}`),
                { title: postTitle, description: postDesc }
            );
        }
        const response = await fetch(photo);
        const blob = await response.blob();
        const storageRef = ref(
            storage,
            "users/testUser/" +
                (type == "beReal" ? "reals/" : "items/") +
                JSON.stringify(count + 1)
        );
        uploadBytes(storageRef, blob).then((snapshot) => {
            console.log("Uploaded a photo!");
        });
        let temp = {};
        if (type == "borrowItems") {
            temp = doc(db, type, "items");
        } else temp = doc(db, type, "reals");
        /*setTimeout(async () => {
            let feed = (await getDoc(temp)).data();
            const temper = doc(
                db,
                "users",
                "testUser",
                type,
                JSON.stringify(count + 1)
            );
            feed.push(temp);
        }, 3000);(/\\)*/
    }

    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={type} ref={camera}></Camera>
            <View style={styles.twobuttons}>
                <TouchableOpacity style={styles.button} onPress={takePicture}>
                    <Text style={styles.text}>Take Picture</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={toggleCameraType}
                >
                    <Text style={styles.text}>Flip Camera</Text>
                </TouchableOpacity>
            </View>
            <Modal
                backdropColor={"white"}
                transparent={true}
                visible={isModalVisible}
                animationType="slide"
            >
                <View style={styles.modalContainer}>
                    <Text
                        style={{
                            alignSelf: "center",
                            width: 200,
                            textAlign: "center",
                        }}
                    >
                        {title === "Post a Resource"
                            ? "Be cool and post a Resource"
                            : "You get to post a BeKind!"}
                    </Text>
                    {title === "Post a Resource" && (
                        <>
                            <TextInput
                                placeholder="Name of item"
                                onChangeText={setPostTitle}
                            />
                            <TextInput
                                placeholder="Description of item"
                                onChangeText={setPostDesc}
                            />
                        </>
                    )}
                    <Button
                        title="Post"
                        onPress={() => {
                            setIsModalVisible(false);
                            camera.current.resumePreview();
                            uploadImage(
                                title === "Post a Resource"
                                    ? "borrowItems"
                                    : "beReal"
                            );
                            {
                                title === "Post a Resource"
                                    ? navigation.navigate("Resources")
                                    : navigation.navigate("BeKind");
                            }
                        }}
                    ></Button>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { display: "flex" },
    camera: { height: 500 },
    modalContainer: {
        margin: 50,
        backgroundColor: "white",
        elevation: 5,
        borderRadius: 10,
    },
    button: {
        alignContent: "center",
        justifyContent: "center",
        textAlign: "center",
        margin: 40,
        marginBottom: 0,
        maxHeight: 50,
        maxWidth: 200,
        backgroundColor: "lightblue",
        padding: 10,
        borderRadius: 15,
        borderWidth: 2,
    },
    text: {
        fontWeight: "bold",
    },
    twobuttons: {
        alignContent: "center",
        justifyContent: "center",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
});

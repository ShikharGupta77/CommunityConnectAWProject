import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
import {
    Button,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import axios from "axios";

// An image scanner for the camera
export default function ImageScanner({ navigation }) {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [image, setImage] = useState("");
    const [camera, setCamera] = useState();

    function toggleCameraType() {
        setType((current) =>
            current === CameraType.back ? CameraType.front : CameraType.back
        );
    }
    const blobToBase64 = (blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        return new Promise((resolve) => {
            reader.onloadend = () => {
                resolve(reader.result);
            };
        });
    };

    async function postImage() {
        let based = "";
        const response = await fetch(image);
        const blobbed = await response.blob();
        await blobToBase64(blobbed).then(async (res) => {
            based = res;
        });

        axios
            .post("http://10.20.85.181:5000/image-receiver", {
                baseString: based,
            })
            .then(function (response) {
                navigation.navigate("Food", {
                    imagePath: image,
                    responseData: response.data,
                });
            })
            .catch(function (error) {
                alert(error);
                console.log(error);
            });
    }

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: "center" }}>
                    We need your permission to show the camera
                </Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }
    if (image && image.length > 0) {
        return (
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: image }}
                    style={{
                        maxWidth: "100%",
                        minHeight: "80%",
                        backgroundColor: "blue",
                        aspectRatio: 1,
                    }}
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => setImage("")}
                        style={styles.retakeButton}
                    >
                        <Text style={styles.buttonText}>Retake Photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={postImage}
                        style={styles.submitButton}
                    >
                        <Text style={styles.buttonText}>Upload Photo</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <Camera
                style={styles.camera}
                type={type}
                ratio={"1:1"}
                ref={(ref) => setCamera(ref)}
            >
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Home");
                    }}
                >
                    <Ionicons
                        name="close-outline"
                        size={32}
                        color="white"
                        style={styles.closeButton}
                    />
                </TouchableOpacity>
            </Camera>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.captureButton}
                    onPress={async () => {
                        if (camera) {
                            const data = await camera.takePictureAsync({
                                base64: true,
                            });
                            setImage(data.uri);
                        }
                    }}
                >
                    <Text style={styles.buttonText}>Take Photo!</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        zIndex: 1,
        flex: 1,
        justifyContent: "center",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        height: "auto",
    },
    imageContainer: {
        zIndex: 1,
        flex: 1,
        justifyContent: "center",
        width: "100%",
        height: "auto",
    },
    camera: {
        flex: 1,
        width: "100%",
        height: "50%",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "transparent",
        marginHorizontal: 64,
        marginTop: 64,
        height: "10%",
    },
    buttonText: {
        color: "floralwhite",
    },
    button: {
        alignItems: "center",
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
    },
    retakeButton: {
        elevation: 8,
        backgroundColor: "green",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginBottom: 20,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    submitButton: {
        elevation: 8,
        backgroundColor: "green",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginBottom: 20,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    captureButton: {
        elevation: 8,
        backgroundColor: "green",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginBottom: 20,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    closeButton: {
        alignSelf: "flex-end",
        marginTop: "10%",
    },
});

/*
This document creates the layout for BeKind. It handles the functionality
for the like button and lays out all components of each BeKind Page. It also
styles them appropriately.
*/
import {
    ScrollView,
    Text,
    Button,
    StyleSheet,
    Alert,
    Image,
    View,
} from "react-native";
import { useState } from "react";
import Icon from "react-native-vector-icons/Feather";
import { Pressable } from "react-native";
import { Card } from "react-native-elements";

export default function BeKind(props) {
    const [likeColor, setLikeColor] = useState("white");
    const [like, setLike] = useState(false);
    const [count, setCount] = useState(props.likes);
    function handleClick() {
        if (!like) {
            setCount(count + 1);
            setLikeColor("darkblue");
        } else {
            setCount(count - 1);
            setLikeColor("white");
        }
        setLike(!like);
    }

    return (
        <>
            <Image style={styles.feedImage} source={props.img_name} />
            <View style={styles.nameLike}>
                {/* <Card.Image
                    source={{
                        uri: "https://cdn0.iconfinder.com/data/icons/communication-456/24/account_profile_user_contact_person_avatar_placeholder-512.png",
                    }}
                    style={{
                        maxWidth: 1000,
                        // alignSelf: "center",
                        // resizeMode: "center",
                        // objectFit: "contain",
                    }}
                ></Card.Image> */}

                <Image style={styles.profileImage} source={props.profile_pic} />
                <Text style={styles.personName}>{props.name}</Text>
                <Pressable
                    style={styles.button}
                    title="Button 1"
                    onPress={handleClick}
                >
                    <Icon
                        name="thumbs-up"
                        type="font-awesome"
                        color={likeColor}
                        size={25}
                    />
                </Pressable>
                <Text style={styles.likeCounter}>{count}</Text>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    profileImage: {
        marginLeft: 10,
        marginTop: 19,
        width: "10%",
        height: "20%",
        borderRadius: 25,
        borderWidth: 2,
    },
    feedImage: {
        padding: 20,
        width: "100%",
        height: "80%",
    },
    likeCounter: {
        fontSize: 20,
        padding: 20,
        paddingRight: 25,
        fontWeight: "bold",
    },
    personName: {
        fontSize: 20,
        padding: 20,
        fontWeight: "bold",
        marginRight: "auto",
    },
    nameLike: {
        flex: 2,
        flexDirection: "row",
        padding: 10,
        justifyContent: "flex-end",
    },
    // LikeIcon: {
    //     resizeMode: 'repeat',
    //     height: 100,
    //     width: 200,
    // },

    button: {
        maxHeight: 60,
        maxWidth: 90,
        zIndex: -1,
        fontSize: 30,
        borderRadius: "15px",
        backgroundColor: "lightblue",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 20,
        elevation: 3,
        borderWidth: 2,
    },
});

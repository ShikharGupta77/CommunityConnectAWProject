/*
This document loads the feed for BeKind and implements scrolling functionality.
It passes in the appropriate variables to the BeKind page.
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
import BeKind from "./BeKind";
import Navbar from "../components/Navbar";

import { Container, Content } from "native-base";
import Swiper from "react-native-swiper";

export default function BeKindContainer() {
    [loaded, setLoaded] = useState(false);

    return (
        <>
            <Swiper
                horizontal={false}
                loop={false}
                showsPagination={false}
                index={0}
            >
                <BeKind
                    name={"Shikhar G"}
                    img_name={require("../components/temp/IMG_4386.jpg")}
                    profile_pic={require("../components/temp/IMG_4391.jpg")}
                    likes={5}
                />
                <BeKind
                    name={"Amy H"}
                    img_name={require("../components/temp/IMG_4391.jpg")}
                    profile_pic={require("../components/temp/IMG_4391.jpg")}
                    likes={5}
                />
                <BeKind
                    name={"Jay Y"}
                    img_name={require("../components/temp/IMG_4390.jpg")}
                    profile_pic={require("../components/temp/IMG_4391.jpg")}
                    likes={5}
                />
            </Swiper>
            <Navbar />
        </>
    );
}

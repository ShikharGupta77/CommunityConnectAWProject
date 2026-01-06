import React from "react";
import { Text } from "react-native";
import PostCard from "../components/PostCard";
import { StatusBar } from "expo-status-bar";
import {
    SafeAreaView,
    StyleSheet,
    View,
    Button,
    ScrollView,
    RefreshControl,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Navbar from "../components/Navbar";

export default function Resources({ navigation }) {
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 500);
    }, []);

    return (
        <>
            <SafeAreaView>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <PostCard
                        link="https://www.webstaurantstore.com/images/products/large/592461/2126188.jpg"
                        title="Stepladder"
                        description="Slightly used ladder. 6 feet tall. Can be used for painting, cleaning, installations, etc."
                        phone="6692899099"
                        username="Jane Doe"
                        ccp={17}
                    />
                    <PostCard
                        link="https://media.istockphoto.com/id/1161894178/vector/lawn-mower-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=nLw0LyFeZ-bsO9ji1BlqGiSPAZQwlNK5R4Nez-3DbEQ="
                        title="Lawnmower"
                        description="5 year old lawnmower. Bit rusty, but still works. Is collapsible to fit in car trunks."
                        phone="6507096341"
                        username="John Doe"
                        ccp={4}
                    />
                    <PostCard
                        link="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGetiS0it-geSiYsAQS7T-orRCmULcvNyuoM78mo-evAXzjprDqfwR1K1bq3qpNA-Hxew&usqp=CAU"
                        title="Snow Blower"
                        description="Sturdy Snow Blower. Has been very useful after big snow storms. Can clear very deep snow."
                        username="Bob McCallister"
                        phone="1234567890"
                        ccp={8}
                    />
                </ScrollView>
            </SafeAreaView>

            <Navbar />
        </>
    );
}

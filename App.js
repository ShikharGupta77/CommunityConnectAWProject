import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PostCard from "./components/PostCard";
import AddImage from "./pages/AddImage";
import BeKindContainer from "./pages/BeKindContainer";
import ImageScanner from "./components/ImageScanner";
import Navbar from "./components/Navbar";
import Resources from "./pages/Resources";
import ExpandedPostCard from "./components/ExpandedPostCard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ChoosePostType from "./pages/ChoosePostType";
import Home from "./pages/Home";
import { NativeBaseProvider } from "native-base";
const Stack = createNativeStackNavigator();

// This component stores the main app, configured to work with the NavigationContainer in React Native
export default function App() {
    return (
        <NavigationContainer>
            <NativeBaseProvider>
                {/*}
            <View style={styles.container}>
                <StatusBar style="auto" />
                <PostCard></PostCard>
            </View> */}
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Resources" component={Resources} />
                    <Stack.Screen name="AddImage" component={AddImage} />
                    <Stack.Screen name="BeKind" component={BeKindContainer} />
                    <Stack.Screen
                        name="Item Details"
                        component={ExpandedPostCard}
                    />
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Signup" component={Signup} />
                    <Stack.Screen
                        name="ChoosePostType"
                        component={ChoosePostType}
                    />
                </Stack.Navigator>
            </NativeBaseProvider>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

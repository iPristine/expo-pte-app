import {Stack} from "expo-router";
import { Image } from "react-native";


const AuthLayout = () => {

    return (
        <>
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="welcome"/>
            <Stack.Screen name="sign-in"/>
            <Stack.Screen name="register"/>
        </Stack>
        <Image style={{ position: "absolute", zIndex: 99, top: 45, right: 8, opacity: 0.5}} source={require("../../../assets/images/image001.png")}/>
        <Image style={{ position: "absolute", zIndex: 99, width: "100%", height: "30%", bottom: 0, right: 0 }} source={require("../../../assets/images/login-page-image.png")}/>
        </>
    )
}

export default AuthLayout
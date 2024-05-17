import {Stack} from "expo-router";
import {Header} from "@/src/modules/app/ui/header";


const AuthLayout = () => {

    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="welcome"/>
            <Stack.Screen name="sign-in"/>
            <Stack.Screen name="register"/>
        </Stack>
    )
}

export default AuthLayout
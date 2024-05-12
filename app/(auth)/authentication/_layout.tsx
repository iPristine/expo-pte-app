import {Stack} from "expo-router";


const AuthLayout = () => {

    return (
        <Stack>
            <Stack.Screen name="welcome"/>
            <Stack.Screen name="sign-in"/>
            <Stack.Screen name="register"/>
        </Stack>
    )
}

export default AuthLayout
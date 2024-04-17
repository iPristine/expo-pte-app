import {Text, View} from 'react-native'
import {router} from "expo-router";

export function WelcomeScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text
                onPress={() => router.push("/authentication/sign-in")}>
                Sign In
            </Text>
            <Text
                onPress={() => router.push("/authentication/register")}>
                Register
            </Text>
        </View>
    );
}


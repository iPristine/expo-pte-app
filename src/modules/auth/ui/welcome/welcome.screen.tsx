import {View} from 'react-native'
import {router} from "expo-router";
import {Button, useTheme} from 'react-native-paper'


export function WelcomeScreen() {
    const {colors: {background}} = useTheme()

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 8, backgroundColor: background }}>
            <Button
                onPress={() => router.push("/authentication/sign-in")}
            >
                Вход
            </Button>
            <Button
                onPress={() => router.push("/authentication/register")}
            >
                Регистрация
            </Button>
        </View>
    );
}


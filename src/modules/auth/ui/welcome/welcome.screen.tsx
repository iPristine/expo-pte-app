import {View} from 'react-native'
import {router} from "expo-router";
import {Button, useTheme} from 'react-native-paper'
import {Text} from "react-native-paper";


export function WelcomeScreen() {
    const {colors: {onPrimary, primary}} = useTheme()

    return (
        <>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 8, backgroundColor: "#282481" }}>
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
        <Text style={{fontSize: 60, position: 'absolute', top: 40, left: 15}}>{'ПТЭ\nКХП'}</Text>
        </>
    );
}


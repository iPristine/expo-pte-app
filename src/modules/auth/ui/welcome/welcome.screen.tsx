import {View} from 'react-native'
import {router} from "expo-router";
import {Button, useTheme} from 'react-native-paper'
import {Text} from "react-native-paper";
import { useAuthContext } from '../../use-auth-context';


export function WelcomeScreen() {
    const {colors: {onPrimary, primary}} = useTheme()
    const { authAction, authStore  } = useAuthContext()

    return (
        <>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 8, backgroundColor: "#282481" }}>
            <Button
                onPress={() => {router.replace("/"); authStore.token.setData('abdishba');}}
            >
                Вход
            </Button>
        </View>
        <Text style={{fontSize: 60, position: 'absolute', top: 40, left: 15}}>{'ПТЭ\nКХП'}</Text>
        </>
    );
}


import React from 'react';
import { View, StyleSheet } from 'react-native';
import {useAuthContext} from "@/src/modules/auth/use-auth-context";
import {observer} from "mobx-react-lite";
import {router} from "expo-router";
import {useTheme, TextInput, Button, Text} from "react-native-paper";

export const SignInScreen = observer(() => {
    const {colors: {primary, onPrimary, error}} = useTheme()

    const { authAction, authStore  } = useAuthContext()

    const handleLogin = () => {
        authAction.handleLogin()
    };

    const handleBack = () => {
        router.replace('/')
    }

    return (
        <View style={{...styles.container, backgroundColor: "#282481"}}>
            <TextInput
                style={[styles.input]}
                placeholder="Логин"
                autoCorrect={false}
                autoCapitalize="none"
                value={authStore.username.data || ""}
                onChangeText={authStore.username.setData}
            />
            <TextInput
                style={[styles.input]}
                placeholder="Пароль"
                autoCorrect={false}
                autoCapitalize='none'
                secureTextEntry={true}
                value={authStore.password.data || ""}
                onChangeText={authStore.password.setData}
            />
            <Button  onPress={handleLogin}>
                Войти
            </Button>
            <Button  onPress={handleBack}>
                Назад
            </Button>
            {authStore.token.error && (
                <Text style={{color: error}}>
                    {authStore.token.error}
                </Text>
            )}
        </View>
    );
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});



import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import {useAuthContext} from "@/src/modules/auth/use-auth-context";
import {observer} from "mobx-react-lite";
import {router} from "expo-router";

export const SignInScreen = observer(() => {
    const { authAction, authStore  } = useAuthContext()

    const handleLogin = () => {
        authAction.handleLogin()
    };

    const handleBack = () => {
        router.replace('/')

    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Логин"
                autoCorrect={false}
                autoCapitalize="none"
                value={authStore.loginValidator.values.username}
                onChangeText={authStore.loginValidator.handlers.username}
            />
            <TextInput
                style={styles.input}
                placeholder="Пароль"
                secureTextEntry={true}
                value={authStore.loginValidator.values.password}
                onChangeText={authStore.loginValidator.handlers.password}
            />
            <Button title="Войти" onPress={handleLogin} />
            <Button title="Назад" onPress={handleBack} />
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



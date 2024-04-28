import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import {observer} from "mobx-react-lite";
import {router} from "expo-router";
import {useAuthContext} from "@/src/modules/auth/use-auth-context";

export const RegisterScreen =  observer(() => {
    const {authAction, authStore} = useAuthContext()

    const handleRegister = () => {
        authAction.handleRegister()
    };

    const handleBack = () => {
        router.replace('/')
    }

    return (
        <View style={styles.container}>
            <TextInput
                autoCorrect={false}
                autoCapitalize="none"
                style={styles.input}
                placeholder="Логин"
                value={authStore.registerValidator.values.username}
                onChangeText={authStore.registerValidator.handlers.username}
            />
            <TextInput
                autoCorrect={false}
                autoCapitalize="none"
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                value={authStore.registerValidator.values.email}
                onChangeText={authStore.registerValidator.handlers.email}
            />
            <TextInput
                autoCorrect={false}
                style={styles.input}
                placeholder="Полное имя"
                value={authStore.registerValidator.values.fullName}
                onChangeText={authStore.registerValidator.handlers.fullName}
            />
            <TextInput
                autoCorrect={false}
                autoCapitalize="none"
                style={styles.input}
                placeholder="Пароль"
                secureTextEntry={true}
                value={authStore.registerValidator.values.password}
                onChangeText={authStore.registerValidator.handlers.password}
            />
            <Button title="Зарегистрироваться" onPress={handleRegister} />
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

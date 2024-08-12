import React from 'react';
import { View, StyleSheet } from 'react-native';
import {observer} from "mobx-react-lite";
import {router} from "expo-router";
import {useAuthContext} from "@/src/modules/auth/use-auth-context";
import {useTheme, TextInput, Button} from "react-native-paper";

export const RegisterScreen =  observer(() => {
    const {colors: {primary, onPrimary, error}} = useTheme()
    const {authAction, authStore} = useAuthContext()

    const handleRegister = () => {
        authAction.handleRegister()
    };

    const handleBack = () => {
        router.replace('/')
    }

    return (
        <View style={{...styles.container, backgroundColor: "#282481"}}>
            <TextInput
                autoCorrect={false}
                autoCapitalize="none"
                style={[styles.input]}
                placeholder="Логин"
                value={authStore.username.data || ""}
                onChangeText={authStore.username.setData}
            />
            <TextInput
                autoCorrect={false}
                autoCapitalize="none"
                style={[styles.input]}
                placeholder="Email"
                keyboardType="email-address"
                value={authStore.email.data || ""}
                onChangeText={authStore.email.setData}
            />
            <TextInput
                autoCorrect={false}
                style={[styles.input]}
                placeholder="Полное имя"
                value={authStore.fullName.data || ""}
                onChangeText={authStore.fullName.setData}
            />
            <TextInput
                autoCorrect={false}
                autoCapitalize="none"
                style={[styles.input]}
                placeholder="Пароль"
                secureTextEntry={true}
                value={authStore.password.data || ""}
                onChangeText={authStore.password.setData}
            />
            <Button onPress={handleRegister}>
                Зарегистрироваться
            </Button>
            <Button onPress={handleBack}>
                Назад
            </Button>
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

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export function RegisterScreen() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        // Здесь можно выполнить логику регистрации, например, отправить данные на сервер для создания нового пользователя

        console.log('Username:', username);
        console.log('Email:', email);
        console.log('Full Name:', fullName);
        console.log('Password:', password);

        fetch("https://sevquad.tech/token").then(console.log)
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Логин"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Полное имя"
                value={fullName}
                onChangeText={setFullName}
            />
            <TextInput
                style={styles.input}
                placeholder="Пароль"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Зарегистрироваться" onPress={handleRegister} />
        </View>
    );
}

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

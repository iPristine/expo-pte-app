import React, {useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {observer} from "mobx-react-lite";
import {Badge, Button, Card, Icon, Text, useTheme} from 'react-native-paper';

import {useUserContext} from "@/src/modules/user/use-user-context";
import {router} from "expo-router";

export const ProfileScreen = observer(() => {
    const {colors: {background}} = useTheme()
    const {userStore, userAction} = useUserContext()

    useEffect(() => {
        userAction.loadUser()
    }, []);

    const handleOpenFavorates = () => {
        router.push("/favorates")
    }


    if (userStore.user.isLoading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (userStore.user.isError) {
        return (
            <View style={styles.container}>
                <Text onPress={userAction.loadUser}>Try again</Text>
                <Text>Error: {userStore.user.error}</Text>
            </View>
        );
    }

    if (!userStore.user.data) {
        return (
            <View style={styles.container}>
                <Text>No data</Text>
            </View>
        );
    }


    return (
        <ScrollView style={{backgroundColor: background}}>
        <Card>
            <Card.Content>
                <Text variant="bodySmall">Имя:</Text>
                <Text variant="titleLarge">{userStore.user.data.fullName}</Text>
                <Text variant="bodySmall">email:</Text>
                <Text variant="bodyMedium">{userStore.user.data.email}</Text>
                <Text variant="bodySmall">username:</Text>
                <Text variant="bodyMedium">{userStore.user.data.username}</Text>
                <Text variant="bodySmall">Статус: {userStore.user.data.disabled ? <Icon size={16} source="minus-circle-outline" color="red" /> : <Icon size={16} source="check-circle-outline" color="green" />}
                </Text>

                <Button onPress={handleOpenFavorates}><View
                    style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 8}}>
                    <Text variant="labelMedium">Избранное</Text>
                    <Badge>{userStore.user.data.favorates.length}</Badge>
                </View>
                </Button>
            </Card.Content>
        </Card>
        </ScrollView>
    );
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {observer} from "mobx-react-lite";
import {Badge, Button, Card, Icon, Text, useTheme} from 'react-native-paper';

import {useUserContext} from "@/src/modules/user/use-user-context";
import {router} from "expo-router";
import {useAppContext} from "@/src/modules/app/use-app-context";
import {VariantProp} from "react-native-paper/lib/typescript/components/Typography/types";

const fontVariants: VariantProp<string>[] = [
    "displayLarge",
    "displayMedium",
    "displaySmall",
    "headlineLarge",
    "headlineMedium",
    "headlineSmall",
    "titleLarge",
    "titleMedium",
    "titleSmall",
    "labelLarge",
    "labelMedium",
    "labelSmall",
    "bodyLarge",
    "bodyMedium",
    "bodySmall"
]

export const ProfileScreen = observer(() => {
    const [fontVariantNumber, setFontVariantNumber] = useState(7)
    const {colors: {background}} = useTheme()
    const {userStore, userAction} = useUserContext()
    const {appStore, appAction} = useAppContext()


    useEffect(() => {
        userAction.loadUser()
    }, []);

    const toggleTheme = () => {
        if (appStore.themeName.data === "dark") {
            appAction.setTheme('light')
        } else {
            appAction.setTheme('dark')
        }
    }

    const handleOpenFavorates = () => {
        router.push("/favorates")
    }

    const getFontVariant = ()=>{
        return fontVariants[fontVariantNumber]
    }

    const isPrevFontDisabled = fontVariantNumber === fontVariants.length+1
    const isNextFontDisabled = fontVariantNumber === 0

    const handleNextFontVariant = () => {
        setFontVariantNumber(fontVariantNumber-1)
        appAction.setFontSize(getFontVariant())
    }

    const handlePrevFontVariant = () => {
        setFontVariantNumber(fontVariantNumber+1)
        appAction.setFontSize(getFontVariant())
    }



    if (userStore.user.isLoading) {
        return (
            <View style={[styles.container, {backgroundColor: background}]}>
                <Text>Загрузка...</Text>
            </View>
        );
    }

    if (userStore.user.isError) {
        return (
            <View style={[styles.container, {backgroundColor: background}]}>
                <Text onPress={userAction.loadUser}>Обновить</Text>
                <Text>Error: {userStore.user.error}</Text>
            </View>
        );
    }

    if (!userStore.user.data) {
        return (
            <View style={[styles.container, {backgroundColor: background}]}>
                <Text>Нет данных</Text>
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
                    <Text variant="bodySmall">Статус: {userStore.user.data.disabled ?
                        <Icon size={16} source="minus-circle-outline" color="red"/> :
                        <Icon size={16} source="check-circle-outline" color="green"/>}
                    </Text>

                    <Button onPress={handleOpenFavorates}>
                        <View
                            style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 8}}
                        >
                            <Text variant="labelMedium">Избранное</Text>
                            <Badge>{userStore.user.data.favorates.length}</Badge>
                        </View>
                    </Button>

                    <Button onPress={toggleTheme}>
                        <View
                            style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 8}}
                        >
                            <Text variant="labelMedium">Сменить тему</Text>
                            <Icon size={16} source={'theme-light-dark'}/>
                        </View>
                    </Button>

                    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                        <Button disabled={isPrevFontDisabled} onPress={handlePrevFontVariant}>
                            <Icon size={32} source={'minus'}/>
                        </Button>
                        <Text variant={appStore.fontSize.data || undefined}>Пример текста</Text>
                        <Button disabled={isNextFontDisabled} onPress={handleNextFontVariant}>
                            <Icon size={32} source={'plus'}/>
                        </Button>
                    </View>
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

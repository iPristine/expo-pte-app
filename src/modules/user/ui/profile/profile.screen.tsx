import React, {useEffect} from 'react';
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
    "bodyLarge",
    "titleMedium",
    "labelLarge",
    "titleSmall",
    "bodyMedium",
    "labelMedium",
    "bodySmall",
    "labelSmall",
]

export const ProfileScreen = observer(() => {
    const {colors: {background}} = useTheme()
    const {appStore, appAction} = useAppContext()


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
    const index = fontVariants.indexOf(appStore.fontSize.data ?? 'titleMedium')

    const isPrevFontDisabled = (fontVariants.length-1) === index
    const isNextFontDisabled = index === 0

    const handleNextFontVariant = () => {
        if(!appStore.fontSize.data){
            appAction.setFontSize("titleMedium")
            return
        }
        const index = fontVariants.indexOf(appStore.fontSize.data)
        if(index >0){
            appAction.setFontSize(fontVariants[index-1])
        }
    }

    const handlePrevFontVariant = () => {
        if(!appStore.fontSize.data){
            appAction.setFontSize("titleMedium")
            return
        }
        const index = fontVariants.indexOf(appStore.fontSize.data)
        if(index < fontVariants.length-1){
            appAction.setFontSize(fontVariants[index+1])
        }
    }

    return (
        <ScrollView style={{backgroundColor: background}}>
            <Card>
                <Card.Content>
                    {/* <Button onPress={handleOpenFavorates}>
                        <View
                            style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 8}}
                        >
                            <Text variant="labelMedium">Избранное</Text>
                            <Badge>{userStore.user.data.favorates.length}</Badge>
                        </View>
                    </Button> */}

                    <Button onPress={toggleTheme}>
                        <View
                            style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 8}}
                        >
                            <Text variant="labelMedium">Сменить тему</Text>
                            <Icon size={16} source={'theme-light-dark'}/>
                        </View>
                    </Button>

                    {/* <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                        <Button style={{alignItems: 'center'}} disabled={isPrevFontDisabled} onPress={handlePrevFontVariant}>
                            <Icon size={32} source={'minus'}/>
                        </Button>
                        <Text variant={appStore.fontSize.data || undefined}>{appStore.fontSize.data}</Text>
                        <Button style={{alignItems: 'center'}} disabled={isNextFontDisabled} onPress={handleNextFontVariant}>
                            <Icon size={32} source={'plus'}/>
                        </Button>
                    </View> */}
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

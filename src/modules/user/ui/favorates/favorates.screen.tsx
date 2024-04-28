import React, {useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {observer} from "mobx-react-lite";
import {ChapterCard} from "@/src/modules/chapter/ui/chapter-card/chapter-card";
import {useUserContext} from "@/src/modules/user/use-user-context";

export const FavoratesScreen =  observer(() => {

    const {userStore, userAction} = useUserContext()

    useEffect(() => {
        userAction.loadFavorates()
    }, []);


    if (userStore.favorates.isLoading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    if(userStore.favorates.isError){
        return (
            <View style={styles.container}>
                <Text onPress={userAction.loadFavorates}>Try again</Text>
                <Text>Error: {userStore.favorates.error}</Text>
            </View>
        );
    }

    if(!userStore.favorates.data?.length){
        return (
            <View style={styles.container}>
                <Text>В избранном пусто</Text>
            </View>
        );
    }


    return (
        <ScrollView style={styles.container}>

            {userStore.favorates.data.map(chapter => (
                <ChapterCard key={chapter.id} chapter={chapter} isFavorate />
            ))}
        </ScrollView>
    );
})

const styles = StyleSheet.create({
    container: {
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

import React, {useEffect} from 'react';
import { View, ScrollView } from 'react-native';
import {observer} from "mobx-react-lite";
import {useUserContext} from "@/src/modules/user/use-user-context";
import {useTheme, Text} from "react-native-paper";
import { FavorateAppendCard } from '@/src/modules/chapter/ui/favorate-card/favorate-append-card';
import { FavorateCard } from '@/src/modules/chapter/ui/favorate-card/favorate-card';

export const FavoratesScreen =  observer(() => {
    const {colors: {background}} = useTheme()
    const {userStore, userAction} = useUserContext()

    useEffect(() => {
        userAction.loadFavorates()
    }, []);


    if (userStore.favorates.isLoading) {
        return (
            <View style={{backgroundColor: background, flex: 1}}>
                <Text>Загрузка...</Text>
            </View>
        );
    }

    if(userStore.favorates.isError){
        return (
            <View style={{backgroundColor: background, flex: 1}}>
                <Text onPress={userAction.loadFavorates}>Обновить</Text>
                <Text>Error: {userStore.favorates.error}</Text>
            </View>
        );
    }

    if(!userStore.favorates.data?.length){
        return (
            <View style={{backgroundColor: background, flex: 1}}>
                <Text>В избранном пусто</Text>
            </View>
        );
    }


    return (
        <ScrollView style={{backgroundColor: background}}>
            {userStore.favorates.data.map((chapter) => (
                <FavorateAppendCard key={`favorate-card-${chapter.id}`} chapter={chapter}/>
            ))}
        </ScrollView>
    );
})


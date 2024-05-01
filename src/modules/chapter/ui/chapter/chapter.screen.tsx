import React, {useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import {observer} from "mobx-react-lite";
import { ScrollView } from "react-native"
import {useChapterContext} from "@/src/modules/chapter/use-chapter-context";
import {useGlobalSearchParams} from "expo-router";
import {ChapterContent} from "@/src/modules/chapter/ui/chapter/chapter-content";
import {useTheme, Text} from "react-native-paper";

export const ChapterScreen =  observer(() => {
    const {colors: {background}} =useTheme()
    const { id: chapterId} =
        useGlobalSearchParams<{
            id: string
        }>()

    const {chaptersAction, chaptersStore} = useChapterContext()

    useEffect(() => {
        chaptersAction.loadChapter(chapterId)
    }, []);


    if (chaptersStore.chapterDetails.isLoading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    if(chaptersStore.chapterDetails.isError){
        return (
            <View style={styles.container}>
                <Text onPress={()=> chaptersAction.loadChapter(chapterId)}>Try again</Text>
                <Text>Error: {chaptersStore.chapterDetails.error}</Text>
            </View>
        );
    }

    if(!chaptersStore.chapterDetails.data?.content?.length){
        return (
            <View style={styles.container}>
                <Text>No content</Text>
            </View>
        );
    }


    return (
        <ScrollView style={[styles.screen,{backgroundColor: background}]} contentContainerStyle={styles.container}>

            {chaptersStore.chapterDetails.data.content.map((content, index) => (
                <ChapterContent
                    key={(typeof content === "string" ? content : content.tagName)+index}
                    chapterContent={content} />
            ))}
        </ScrollView>
    );
})

const styles = StyleSheet.create({
    container: {
        display: "flex",
    },
    screen: {
        display: "flex",
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 16,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

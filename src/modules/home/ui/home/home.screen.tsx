import React, {useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {observer} from "mobx-react-lite";
import {useSectionContext} from "@/src/modules/section/use-section-context";
import {ChapterCard} from "@/src/modules/chapter/ui/chapter-card/chapter-card";

export const HomeScreen =  observer(() => {

    const {sectionsStore, sectionsAction} = useSectionContext()

    useEffect(() => {
        sectionsAction.loadSections()
    }, []);

    useEffect(() => {
        if(sectionsStore.sectionDetailsId.data) {
            sectionsAction.loadSection(sectionsStore.sectionDetailsId.data)
        }
    }, [sectionsStore.sectionDetailsId.data]);

    if (sectionsStore.sectionDetails.isLoading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    if(sectionsStore.sectionDetails.isError){
        return (
            <View style={styles.container}>
                <Text onPress={sectionsAction.loadSections}>Try again</Text>
                <Text>Error: {sectionsStore.sections.error}</Text>
            </View>
        );
    }

    if(!sectionsStore.sectionDetails.data?.chapters.length){
        return (
            <View style={styles.container}>
                <Text>No chapters</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>

            {sectionsStore.sectionDetails.data.chapters.map(chapter => (
                <ChapterCard key={chapter.id} chapter={chapter} />
            ))}
        </View>
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

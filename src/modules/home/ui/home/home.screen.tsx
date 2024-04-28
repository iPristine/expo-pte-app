import React, {useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {observer} from "mobx-react-lite";
import {useSectionContext} from "@/src/modules/section/use-section-context";
import {ChapterCard} from "@/src/modules/chapter/ui/chapter-card/chapter-card";
import {useChapterContext} from "@/src/modules/chapter/use-chapter-context";
import {SearchEntityCard} from "@/src/modules/chapter/ui/search-entity-card/search-entity-card";

export const HomeScreen =  observer(() => {

    const {sectionsStore, sectionsAction} = useSectionContext()
    const {chaptersStore} = useChapterContext()

    useEffect(() => {
        sectionsAction.loadSections()
    }, []);

    useEffect(() => {
        if(sectionsStore.sectionDetailsId.data) {
            sectionsAction.loadSection(sectionsStore.sectionDetailsId.data)
        }
    }, [sectionsStore.sectionDetailsId.data]);

    if (sectionsStore.sectionDetails.isLoading || chaptersStore.searchEntities.isLoading) {
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

    if(chaptersStore.searchValidator.values.searchQuery?.length > 2 && chaptersStore.searchEntities.data){
        return (
            <ScrollView style={styles.container}>
    
                {chaptersStore.searchEntities.data.map(searchEntity => (
                    <SearchEntityCard key={searchEntity.id}  searchEntity={searchEntity} />
                ))}
            </ScrollView>
        );
    }

    return (
        <ScrollView style={styles.container}>

            {sectionsStore.sectionDetails.data.chapters.map(chapter => (
                <ChapterCard key={chapter.id} chapter={chapter} />
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

import React, {useEffect} from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {observer} from "mobx-react-lite";
import {useSectionContext} from "@/src/modules/section/use-section-context";
import {ChapterCard} from "@/src/modules/chapter/ui/chapter-card/chapter-card";
import {useChapterContext} from "@/src/modules/chapter/use-chapter-context";
import {SearchEntityCard} from "@/src/modules/chapter/ui/search-entity-card/search-entity-card";

export const HomeScreen =  observer(() => {
    const {sectionsStore, sectionsAction} = useSectionContext()
    const {chaptersStore} = useChapterContext()
    const {colors: {background}} = useTheme()

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
            <View style={{backgroundColor: background, flex: 1}}>
                <Text>Загрузка...</Text>
            </View>
        );
    }

    if(sectionsStore.sectionDetails.isError){
        return (
            <View style={{backgroundColor: background, flex: 1}}>
                <Text onPress={sectionsAction.loadSections}>Обновить</Text>
                <Text>Error: {sectionsStore.sections.error}</Text>
            </View>
        );
    }

    if(!sectionsStore.sectionDetails.data?.chapters.length){
        return (
            <View style={{backgroundColor: background}}>
                <Text>Нет глав</Text>
            </View>
        );
    }

    if(chaptersStore.searchQuery.data && chaptersStore.searchEntities.data){
        return (
            <ScrollView style={{backgroundColor: background}}>
                {chaptersStore.searchEntities.data.map(searchEntity => (
                    <SearchEntityCard key={searchEntity.id}  searchEntity={searchEntity} />
                ))}
            </ScrollView>
        );
    }

    return (

        <ScrollView style={{backgroundColor: background}}>

            {sectionsStore.sectionDetails.data.chapters.map(chapter => (
                <ChapterCard key={chapter.id} chapter={chapter} />
            ))}
        </ScrollView>
    );
})

const styles = StyleSheet.create({
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

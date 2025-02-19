import React, {useEffect, useState} from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {observer} from "mobx-react-lite";
import {useSectionContext} from "@/src/modules/section/use-section-context";
import {ChapterCard} from "@/src/modules/chapter/ui/chapter-card/chapter-card";
import {useChapterContext} from "@/src/modules/chapter/use-chapter-context";
import {SearchEntityCard} from "@/src/modules/chapter/ui/search-entity-card/search-entity-card";

export const HomeScreen =  observer(() => {
    const {sectionsStore, sectionsAction} = useSectionContext()
    const {chaptersStore} = useChapterContext()
    const {colors: {background, onBackground, primary}} = useTheme()

    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        sectionsAction.loadSections()
    }, []);

    useEffect(() => {
        if(sectionsStore.sectionDetailsId.data) {
            sectionsAction.loadSection(sectionsStore.sectionDetailsId.data)
        }
    }, [sectionsStore.sectionDetailsId.data]);

    useEffect(() => {
        if (sectionsStore.sections.isLoading!==isLoading){
            setLoading(sectionsStore.sections.isLoading)
        }
    }, [sectionsStore.sections.isLoading]);

    if (sectionsStore.sectionDetails.isError) {
      return (
        <View style={{ backgroundColor: background, flex: 1 }}>
          <Text onPress={sectionsAction.loadSections}>Обновить</Text>
          <Text>{sectionsStore.sections.error}</Text>
        </View>
      );
    }

    if (isLoading || chaptersStore.searchEntities.isLoading) {
        return (
            <View
          style={[
            {
              display: "flex",
              width: "100%",
              height: "100%",
              position: "absolute",
              backgroundColor: background,
              flex: 1,
              alignContent: "center",
              justifyContent: "center",
            },
          ]}
        >
          <ActivityIndicator size={50} animating={true} color={primary} />
        </View>
        );
    }

    if(!sectionsStore.sectionDetails.data?.chapters.length){
        return (
            <View style={{backgroundColor: background, height: '100%'}}>
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
            <Text style={{color: onBackground}}>{sectionsStore.sectionDetails.data.name}</Text>
            {sectionsStore.sectionDetails.data.chapters.map(chapter => (
                <ChapterCard key={chapter.id} chapter={chapter} />
            ))}
        </ScrollView>
    );
})

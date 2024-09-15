import { Avatar, Card, useTheme } from 'react-native-paper';
import {ChapterEntity} from "@/src/modules/chapter/infra/types/chapter.entity";
import { useRouter} from "expo-router";
import {TouchableOpacity} from "react-native";
import {observer} from "mobx-react-lite";
import {useUserContext} from "@/src/modules/user/use-user-context";
import { View, Text } from '@/components/Themed';
import { useState } from 'react';
import { FavoritesEntity } from '@/src/modules/user/infra/types/favoraties.entity';
import { useChapterContext } from '../../use-chapter-context';

type Props = {
    chapterId: string,
    chapter: FavoritesEntity
}

export const FavorateCard = observer(({chapter, chapterId}:Props) => {
    const router = useRouter()
    const {chaptersStore} = useChapterContext();
    const {colors: {background, onBackground, backdrop}} = useTheme()

    const handleClick = () => {
      chaptersStore.isSearching.setData(false);
      chaptersStore.searchQuery.setData(chapter.text);
      router.push(`/chapter/${chapterId}`)
    }

    return (
        <TouchableOpacity onPress={handleClick}>

      <View style={{marginLeft: 30, borderBottomColor: backdrop, borderBottomWidth: 3, maxWidth: "100%", flexDirection: "row", padding: 15, justifyContent: "space-between", alignItems: "center", backgroundColor: background}}>
        <View style={{ backgroundColor: background, flexDirection: "column", marginLeft: 10, width: "100%"}}>
          <Text style={{ marginLeft: 0, marginRight: "auto", fontSize: 18, fontWeight: "bold", color: onBackground}}>{chapter.text}</Text>
        </View>
        {/* <TouchableOpacity onPress={handleStartClick}><Avatar.Icon size={25} icon={starIconName} /></TouchableOpacity> */}
      </View>
    </TouchableOpacity>
    )
})
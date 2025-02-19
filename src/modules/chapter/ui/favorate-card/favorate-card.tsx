import { Avatar, useTheme } from 'react-native-paper';
import { useRouter} from "expo-router";
import {TouchableOpacity} from "react-native";
import {observer} from "mobx-react-lite";
import { View, Text } from '@/components/Themed';
import { FavoritesEntity } from '@/src/modules/user/infra/types/favoraties.entity';
import { useChapterContext } from '../../use-chapter-context';
import { useUserContext } from '@/src/modules/user/use-user-context';

type Props = {
    chapterId: string,
    index: number,
    chapter: FavoritesEntity
}

export const FavorateCard = observer(({chapter, chapterId, index}:Props) => {
    const router = useRouter()
    const {chaptersStore} = useChapterContext();
    const {colors: {background, onBackground, backdrop}} = useTheme()
    const { userAction } = useUserContext();

    const handleClick = () => {
      chaptersStore.isSearching.setData(false);
      chaptersStore.searchQuery.setData(chapter.text);
      router.push(`/chapter/${chapterId}`)
    }

    const handleDeleteClick = () => {
      userAction.removeFromFavorates(chapterId, index)
    }

    return (
        <TouchableOpacity onPress={handleClick}>

      <View style={{marginLeft: 30, borderBottomColor: backdrop, borderBottomWidth: 3, maxWidth: "100%", flexDirection: "row", padding: 15, justifyContent: "space-between", alignItems: "center", backgroundColor: background}}>
        <View style={{ backgroundColor: background, flexDirection: "column", marginLeft: 10, width: "85%"}}>
          <Text style={{ marginLeft: 0, marginRight: "auto", fontSize: 18, fontWeight: "bold", color: onBackground}}>{chapter.text}</Text>
        </View>
        <TouchableOpacity onPress={handleDeleteClick}><Avatar.Icon size={40} icon="trash-can-outline" /></TouchableOpacity>
      </View>
    </TouchableOpacity>
    )
})
import { Avatar, Card, useTheme } from 'react-native-paper';
import {ChapterEntity} from "@/src/modules/chapter/infra/types/chapter.entity";
import { useRouter} from "expo-router";
import {TouchableOpacity} from "react-native";
import {observer} from "mobx-react-lite";
import {useUserContext} from "@/src/modules/user/use-user-context";
import { View, Text } from '@/components/Themed';
import { useState } from 'react';

type Props = {
    chapter: ChapterEntity
    isFavorate?: boolean
}

export const ChapterCard = observer(({chapter, isFavorate}:Props) => {
    const router = useRouter()
    const {userAction} = useUserContext()
    const {colors: {background, onBackground, backdrop}} = useTheme()
    const [isFavoratet, setIsFavorate] = useState(isFavorate);


    const handleClick = () => {
        router.push(`/chapter/${chapter.id}`)
    }

    // const handleAddToFavorate = () => {
    //     setIsFavorate(!isFavoratet)
    //     userAction.addToFavorates(chapter.id)
    // }

    // const handleRemoveFromFavorate = () => {
    //     setIsFavorate(!isFavoratet)
    //     userAction.removeFromFavorates(chapter.id)
    // }

    // const handleStartClick = () => {
    //     isFavoratet ? handleRemoveFromFavorate() : handleAddToFavorate()
    // }

    const starIconName = isFavoratet ? "star" : "star-outline"

    return (
        <TouchableOpacity onPress={handleClick}>

      <View style={{borderBottomColor: backdrop, borderBottomWidth: 3, maxWidth: "100%", flexDirection: "row", padding: 15, justifyContent: "space-between", alignItems: "center", backgroundColor: background}}>
        <Avatar.Icon size={45} icon="book-arrow-right-outline" />
        <View style={{ backgroundColor: background, flexDirection: "column", marginLeft: 10, width: "75%"}}>
          <Text style={{ marginLeft: 0, marginRight: "auto", fontSize: 18, fontWeight: "bold", color: onBackground}}>{chapter.name.split(' ')[0].toLowerCase() === 'глава' ? chapter.name.split(' ').slice(3).join(' ') : chapter.name}</Text>
        </View>
        {/* <TouchableOpacity onPress={handleStartClick}><Avatar.Icon size={25} icon={starIconName} /></TouchableOpacity> */}
      </View>
    </TouchableOpacity>
    )
})
import { Avatar, Card } from 'react-native-paper';
import {ChapterEntity} from "@/src/modules/chapter/infra/types/chapter.entity";
import { useRouter} from "expo-router";
import {TouchableOpacity} from "react-native";
import {observer} from "mobx-react-lite";
import {useUserContext} from "@/src/modules/user/use-user-context";

type Props = {
    chapter: ChapterEntity
    isFavorate?: boolean
}

export const ChapterCard = observer(({chapter, isFavorate}:Props) => {
    const router = useRouter()
    const {userAction} = useUserContext()


    const handleClick = () => {
        router.push(`/chapter/${chapter.id}`)
    }

    const handleAddToFavorate = () => {
        userAction.addToFavorates(chapter.id)
    }

    return (
        <Card.Title
            onTouchStart={handleClick}
            title={chapter.name}
            left={(props) => <TouchableOpacity onPress={handleClick}><Avatar.Icon {...props} icon="book-arrow-right-outline" /></TouchableOpacity>}
            right={(props) => <TouchableOpacity onPress={handleAddToFavorate}><Avatar.Icon {...props} icon={isFavorate ? "star" : "star-outline"} /></TouchableOpacity>}
        />
    )
})
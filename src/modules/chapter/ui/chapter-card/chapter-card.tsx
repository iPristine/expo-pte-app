import { Avatar, Card } from 'react-native-paper';
import {ChapterEntity} from "@/src/modules/chapter/infra/types/chapter.entity";
import { useRouter} from "expo-router";
import {TouchableOpacity} from "react-native";

type Props = {
    chapter: ChapterEntity
}

export const ChapterCard = ({chapter}:Props) => {
    const router = useRouter()


    const handleClick = () => {
        router.push(`/chapter/${chapter.id}`)
    }

    return (
        <Card.Title
            onTouchStart={handleClick}
            title={chapter.name}
            subtitle="Card Subtitle"
            left={(props) => <TouchableOpacity onPress={handleClick}><Avatar.Icon {...props} icon="book-arrow-right-outline" /></TouchableOpacity>}
        />
    )
}
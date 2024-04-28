import { Avatar, Card } from 'react-native-paper';
import { useRouter} from "expo-router";
import {TouchableOpacity} from "react-native";
import {SearchEntity} from "@/src/modules/chapter/infra/types/search.entity";
import {ChapterContent} from "@/src/modules/chapter/ui/chapter/chapter-content";

type Props = {
    searchEntity: SearchEntity
}

export const SearchEntityCard = ({searchEntity}:Props) => {
    const router = useRouter()


    const handleClick = () => {
        router.push(`/chapter/${searchEntity.chapterId}`)
    }

    return (
        <Card.Title
            onTouchStart={handleClick}
            title={`${searchEntity.sectionName} > ${searchEntity.chapterName}` }
            subtitle={<ChapterContent chapterContent={searchEntity.contentElement} /> }
            left={(props) => <TouchableOpacity onPress={handleClick}><Avatar.Icon {...props} icon="book-arrow-right-outline" /></TouchableOpacity>}
        />
    )
}
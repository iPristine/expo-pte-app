import {ChapterContentEntity} from "@/src/modules/chapter/infra/types/chapter-content.entity";
import {View, Text} from "react-native";
import { List, MD3Colors } from 'react-native-paper';


type Props = {
    chapterContent: ChapterContentEntity
}

export const ChapterContent = ({chapterContent}: Props) => {
    if(!chapterContent) return

    if (typeof chapterContent === "string") return <>{chapterContent}</>

    if (!chapterContent.content.length) return ""

    if (chapterContent.tagName === "span") return <Text>            {chapterContent.content?.map((innerChapterContent, i)=>(
        <ChapterContent
            key={(typeof innerChapterContent === "string" ? innerChapterContent : innerChapterContent.tagName)+i}
            chapterContent={innerChapterContent}
        />
    ))}</Text>

    if(chapterContent.tagName === "p"){
        return (
        <Text>
            {chapterContent.content?.map((innerChapterContent, i)=>(
                <ChapterContent
                    key={(typeof innerChapterContent === "string" ? innerChapterContent : innerChapterContent.tagName)+i}
                    chapterContent={innerChapterContent}
                />
                ))}
        </Text>)
    }

    if (chapterContent.tagName === "br") return <View style={{height: 20}} />

    // if (chapterContent.tagName === "ul") return <List.Section>
    //     {chapterContent.content?.map((innerChapterContent, i)=>(
    //         <List.Item
    //             key={(typeof innerChapterContent === "string" ? innerChapterContent : innerChapterContent.tagName)+i}
    //             title={innerChapterContent}
    //             titleStyle={{color: MD3Colors.text}}
    //         />
    //     ))}

    console.log("unknownTAG:", chapterContent)
    return (
        <View style={{backgroundColor: "red"}}>
            <Text style={{color: "red"}}>{chapterContent.tagName}</Text>
        </View>
    )
}
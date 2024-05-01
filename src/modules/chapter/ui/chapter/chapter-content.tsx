import {ChapterContentEntity} from "@/src/modules/chapter/infra/types/chapter-content.entity";
import {View} from "react-native";
import {Icon, List, DataTable, Text } from 'react-native-paper';



type Props = {
    chapterContent: ChapterContentEntity
}

export const ChapterContent = ({chapterContent}: Props) => {
    if (!chapterContent) return

    if (typeof chapterContent === "string"){
        return <>{chapterContent}</>}

    if (!chapterContent.content.length) return ""

    if (chapterContent.tagName === "div") return (
        <>
            {chapterContent.content?.map((innerChapterContent, i) => (
                <ChapterContent
                    key={(typeof innerChapterContent === "string" ? innerChapterContent : innerChapterContent.tagName) + i}
                    chapterContent={innerChapterContent}
                />
            ))}
        </>
    )

    if (chapterContent.tagName === "span") return (
        <Text selectable selectionColor="blue">
            {chapterContent.content?.map((innerChapterContent, i) => (
                <ChapterContent
                    key={(typeof innerChapterContent === "string" ? innerChapterContent : innerChapterContent.tagName) + i}
                    chapterContent={innerChapterContent}
                />
            ))}
        </Text>)

    if (chapterContent.tagName === "p") {
        return (
            <Text selectable selectionColor="blue">
                {chapterContent.content?.map((innerChapterContent, i) => (
                    <ChapterContent
                        key={(typeof innerChapterContent === "string" ? innerChapterContent : innerChapterContent.tagName) + i}
                        chapterContent={innerChapterContent}
                    />
                ))}
            </Text>)
    }

    if (chapterContent.tagName === "br") return <View style={{height: 20}}/>

    if (chapterContent.tagName === "ul") return (<List.Section>
        {chapterContent.content?.map((innerChapterContent, i) => (
            <ChapterContent
                key={(typeof innerChapterContent === "string" ? innerChapterContent : innerChapterContent.tagName) + i}
                chapterContent={innerChapterContent}
            />
        ))}
    </List.Section>)

    if (chapterContent.tagName === "ol") return (<List.Section>
        {chapterContent.content?.map((innerChapterContent, i) => (
            <ChapterContent
                key={(typeof innerChapterContent === "string" ? innerChapterContent : innerChapterContent.tagName) + i}
                chapterContent={innerChapterContent}
            />
        ))}
    </List.Section>)

    if (chapterContent.tagName === "li"){
        return (
        <List.Item
            left={()=><Icon size={24} source="circle-small" />}
            titleNumberOfLines={999}
            title={(
                <>
                    {chapterContent.content.map((innerChapterContent, i) => (
                        <ChapterContent
                            key={(typeof innerChapterContent === "string" ? innerChapterContent : innerChapterContent.tagName) + i}
                            chapterContent={innerChapterContent}
                        />
                    ))}
                </>)
            }/>)}

    if(chapterContent.tagName === "table") {
        return (
            <DataTable>
                {chapterContent.content.map((innerChapterContent, i) => (
                    <ChapterContent
                        key={(typeof innerChapterContent === "string" ? innerChapterContent : innerChapterContent.tagName) + i}
                        chapterContent={innerChapterContent}
                    />
                ))}
            </DataTable>
        )
    }
    if(chapterContent.tagName === "tbody") {
        return (
            <DataTable>
                {chapterContent.content.map((innerChapterContent, i) => (
                    <ChapterContent
                        key={(typeof innerChapterContent === "string" ? innerChapterContent : innerChapterContent.tagName) + i}
                        chapterContent={innerChapterContent}
                    />
                ))}
            </DataTable>
        )
    }

    if(chapterContent.tagName === "tr") {
        return (
            <DataTable.Row>
                {chapterContent.content.map((innerChapterContent, i) => (
                    <ChapterContent
                        key={(typeof innerChapterContent === "string" ? innerChapterContent : innerChapterContent.tagName) + i}
                        chapterContent={innerChapterContent}
                    />
                ))}
            </DataTable.Row>
        )
    }

    if(chapterContent.tagName === "td") {
        return (
            <DataTable.Cell>
                {chapterContent.content.map((innerChapterContent, i) => (
                    <ChapterContent
                        key={(typeof innerChapterContent === "string" ? innerChapterContent : innerChapterContent.tagName) + i}
                        chapterContent={innerChapterContent}
                    />
                ))}
            </DataTable.Cell>
        )
    }
            console.log("unknownTAG:", chapterContent)

    return (
        <View style={{backgroundColor: "red"}}>
            <Text style={{color: "red"}}>{chapterContent.tagName}</Text>
        </View>
    )
}
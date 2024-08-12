import { ChapterContentEntity } from "@/src/modules/chapter/infra/types/chapter-content.entity";
import { ScrollView, View } from "react-native";
import { Icon, List, DataTable, Text, useTheme } from "react-native-paper";
import { useAppContext } from "@/src/modules/app/use-app-context";

type Props = {
  chapterContent: ChapterContentEntity;
};

export const ChapterContent = ({ chapterContent }: Props) => {
  const { appStore } = useAppContext();
  const variant = appStore.fontSize.data || undefined;
  const {
    colors: { surfaceVariant },
  } = useTheme();

  if (!chapterContent) return;

  if (typeof chapterContent === "string") {
    return (
      <Text variant={variant} selectable selectionColor={surfaceVariant}>
        {chapterContent}
      </Text>
    );
  }

  if (!chapterContent.content.length) return "";

  if (chapterContent.tagName === "div")
    return (
      <>
        {chapterContent.content?.map((innerChapterContent, i) => (
          <ChapterContent
            key={
              (typeof innerChapterContent === "string"
                ? innerChapterContent
                : innerChapterContent.tagName) + i
            }
            chapterContent={innerChapterContent}
          />
        ))}
      </>
    );

  if (chapterContent.tagName === "span")
    return (
      <Text variant={variant} selectable selectionColor={surfaceVariant}>
        {chapterContent.content?.map((innerChapterContent, i) => (
          <ChapterContent
            key={
              (typeof innerChapterContent === "string"
                ? innerChapterContent
                : innerChapterContent.tagName) + i
            }
            chapterContent={innerChapterContent}
          />
        ))}
      </Text>
    );

  if (chapterContent.tagName === "p") {
    return (
      <Text variant={variant} selectable selectionColor={surfaceVariant}>
        {chapterContent.content?.map((innerChapterContent, i) => (
          <ChapterContent
            key={
              (typeof innerChapterContent === "string"
                ? innerChapterContent
                : innerChapterContent.tagName) + i
            }
            chapterContent={innerChapterContent}
          />
        ))}
      </Text>
    );
  }

  if (chapterContent.tagName === "br") return <View style={{ height: 20 }} />;

  if (chapterContent.tagName === "ul")
    return (
      <List.Section>
        {chapterContent.content?.map((innerChapterContent, i) => (
          <ChapterContent
            key={
              (typeof innerChapterContent === "string"
                ? innerChapterContent
                : innerChapterContent.tagName) + i
            }
            chapterContent={innerChapterContent}
          />
        ))}
      </List.Section>
    );

  if (chapterContent.tagName === "ol")
    return (
      <List.Section>
        {chapterContent.content?.map((innerChapterContent, i) => (
          <ChapterContent
            key={
              (typeof innerChapterContent === "string"
                ? innerChapterContent
                : innerChapterContent.tagName) + i
            }
            chapterContent={innerChapterContent}
          />
        ))}
      </List.Section>
    );

  if (chapterContent.tagName === "li") {
    return (
      <List.Item
        left={() => <Icon size={24} source="circle-small" />}
        titleNumberOfLines={999}
        title={
          <>
            {chapterContent.content.map((innerChapterContent, i) => (
              <ChapterContent
                key={
                  (typeof innerChapterContent === "string"
                    ? innerChapterContent
                    : innerChapterContent.tagName) + i
                }
                chapterContent={innerChapterContent}
              />
            ))}
          </>
        }
      />
    );
  }

  if (chapterContent.tagName === "table") {
    return (
      <ScrollView horizontal>
        <DataTable>
          {chapterContent.content.map((innerChapterContent, i) => (
            <ChapterContent
              key={
                (typeof innerChapterContent === "string"
                  ? innerChapterContent
                  : innerChapterContent.tagName) + i
              }
              chapterContent={innerChapterContent}
            />
          ))}
        </DataTable>
      </ScrollView>
    );
  }
  if (chapterContent.tagName === "tbody") {
    return (
      <ScrollView horizontal>
        <DataTable focusable={false}>
          {chapterContent.content.map((innerChapterContent, i) => (
            <ChapterContent
              key={
                (typeof innerChapterContent === "string"
                  ? innerChapterContent
                  : innerChapterContent.tagName) + i
              }
              chapterContent={innerChapterContent}
            />
          ))}
        </DataTable>
      </ScrollView>
    );
  }

  if (chapterContent.tagName === "tr") {
    return (
      <DataTable.Row focusable={false}>
        {chapterContent.content.map((innerChapterContent, i) => (
          <ChapterContent
            key={
              (typeof innerChapterContent === "string"
                ? innerChapterContent
                : innerChapterContent.tagName) + i
            }
            chapterContent={innerChapterContent}
          />
        ))}
      </DataTable.Row>
    );
  }

  if (chapterContent.tagName === "td") {
    return (
      <DataTable.Cell focusable={false}>
        {chapterContent.content.map((innerChapterContent, i) => (
          <ChapterContent
            key={
              (typeof innerChapterContent === "string"
                ? innerChapterContent
                : innerChapterContent.tagName) + i
            }
            chapterContent={innerChapterContent}
          />
        ))}
      </DataTable.Cell>
    );
  }

  if (chapterContent.tagName === "thead") {
    return (
      <>
        {chapterContent.content.map((innerChapterContent, i) => (
          <ChapterContent
            key={
              (typeof innerChapterContent === "string"
                ? innerChapterContent
                : innerChapterContent.tagName) + i
            }
            chapterContent={innerChapterContent}
          />
        ))}
      </>
    );
  }
  console.log("unknownTAG:", chapterContent);

  return (
    <View style={{ backgroundColor: "red" }}>
      <Text style={{ color: "red" }}>
        {chapterContent.content[0].toString()}
      </Text>
    </View>
  );
};

import React, { useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { observer } from "mobx-react-lite";
import { useChapterContext } from "@/src/modules/chapter/use-chapter-context";
import { useGlobalSearchParams } from "expo-router";
import { useTheme, Text, ActivityIndicator } from "react-native-paper";
import { WebView } from "react-native-webview";
import { BASE_API_ENDPOINT } from "@/config";
const rgbToHex = (rgb: string) => {
  const [r, g, b] = rgb
    .replace("rgb(", "")
    .replace(")", "")
    .split(",")
    .map(Number);
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

export const ChapterScreen = observer(() => {
  const {
    colors: { background, onBackground, primary, onPrimary },
  } = useTheme();
  const { id: chapterId } = useGlobalSearchParams<{
    id: string;
  }>();

  const { chaptersAction, chaptersStore } = useChapterContext();

  const wvRef = useRef<WebView>(null);

  useEffect(() => {
    if (chapterId) {
      chaptersAction.loadChapter(chapterId);
    }
  }, []);

  if (chaptersStore.chapterDetails.isError) {
    return (
      <View
        style={[styles.container, { backgroundColor: background, flex: 1 }]}
      >
        <Text
          onPress={() => {
            if (chapterId) {
              chaptersAction.loadChapter(chapterId);
            }
          }}
        >
          Обновить
        </Text>
        <Text>Ошибка: {chaptersStore.chapterDetails.error}</Text>
      </View>
    );
  }

  if (!chaptersStore.chapterDetails.data?.content?.length) {
    return (
      <View
        focusable={false}
        style={[styles.container, { backgroundColor: background }]}
      >
        <Text>Ничего нет</Text>
      </View>
    );
  }

  const js = `setColors("${rgbToHex(background)}", "${rgbToHex(
    onBackground
  )}", "${rgbToHex(primary)}", "${rgbToHex(primary)}", "${rgbToHex(
    onPrimary
  )}", "${BASE_API_ENDPOINT}"); 
    ${
      chaptersStore.searchQuery?.data
        ? `searchKeyword("${chaptersStore.searchQuery.data}");`
        : ""
    }
    true;`;

  return (
    <>
      <WebView
        onLoadEnd={() =>
          setTimeout(() => {
            chaptersStore.chapterDetails.setIsLoading(false);
          }, 1500)
        }
        setSupportMultipleWindows={false}
        scalesPageToFit
        domStorageEnabled
        originWhitelist={["*"]}
        injectedJavaScript={js}
        javaScriptEnabled={true}
        ref={wvRef}
        textZoom={150}
        containerStyle={{ padding: 3, backgroundColor: background }}
        webviewDebuggingEnabled={true}
        source={{
          uri: BASE_API_ENDPOINT+chaptersStore.chapterDetails.data.content,
        }}
      />
      {chaptersStore.chapterDetails.isLoading && (
        <View
          style={[
            styles.container,
            {
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
          <ActivityIndicator animating={true} color={primary} />
        </View>
      )}
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    display: "flex",
  },
  screen: {
    display: "flex",
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

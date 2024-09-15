import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { observer } from "mobx-react-lite";
import { useChapterContext } from "@/src/modules/chapter/use-chapter-context";
import { useGlobalSearchParams } from "expo-router";
import { useTheme, Text, ActivityIndicator, Avatar } from "react-native-paper";
import { WebView, WebViewMessageEvent } from "react-native-webview";
import { BASE_API_ENDPOINT } from "@/config";
import { useUserContext } from "@/src/modules/user/use-user-context";
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
  const { userAction } = useUserContext();

  const wvRef = useRef<WebView>(null);

  const [selectedText, setSelectedText] = useState("");

  const [isFavoratet, setIsFavorate] = useState(false);

  const onMessage = (e: WebViewMessageEvent) => {
    const selectedText = e.nativeEvent.data;
    if(selectedText === 'no-selection') {
      setSelectedText('');
      setIsFavorate(false);
      return;
    }
    setSelectedText(selectedText);
  }

  const AddToFavoraties = () => {
    setIsFavorate(true);
    
    if (!chaptersStore.chapterDetails.data?.name) {
      return;
    }

    userAction.addToFavorates(chapterId, chaptersStore.chapterDetails.data?.name, selectedText);
  }

  const starIconName = isFavoratet ? "star" : "star-outline"

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
    function checkSelection() {
                    var selectedText = window.getSelection().toString();
                    if (selectedText === '') {
                      window.ReactNativeWebView.postMessage('no-selection');
                    } else {
                      window.ReactNativeWebView.postMessage(selectedText);
                    }
                  }

                  document.addEventListener('selectionchange', function() {
                    setTimeout(checkSelection, 100);
                  });
    ${chaptersStore.searchQuery?.data
      ? `searchKeyword("${chaptersStore.searchQuery.data.trim()}");`
      : ""
    }
    true;`;

  return (
    <>
      <WebView
        onLoadEnd={() =>
          setTimeout(() => {
            chaptersStore.chapterDetails.setIsLoading(false);
          }, 500)
        }
        onMessage={onMessage}
        setSupportMultipleWindows={false}
        scalesPageToFit
        domStorageEnabled
        originWhitelist={["*"]}
        injectedJavaScript={js}
        javaScriptEnabled={true}
        ref={wvRef}
        textZoom={200}
        containerStyle={{ padding: 3, backgroundColor: background }}
        source={{
          html: chaptersStore.chapterDetails.data.content,
        }}
      />
      {selectedText && (
        <TouchableOpacity onPress={AddToFavoraties} style={{ position: "absolute", left: 10, bottom: 10 }}>
          <Avatar.Icon size={60} icon={starIconName} />
        </TouchableOpacity>
      )}
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

import { useEffect, useState } from "react";
import { SplashScreen, Stack } from "expo-router";
import { useSession } from "@/src/modules/auth/ctx";
import { Header } from "@/src/modules/app/ui/header";
import { Image, View } from "react-native";
import { useTheme, Text } from "react-native-paper";

export default function AppLayout() {
  const { token, isLoading } = useSession();
  const [isSplash, setIsSplash] = useState(true);
  const {colors: {primaryContainer, onPrimaryContainer: textColor}} = useTheme();

  useEffect(() => {
    async function handleSplashScreen() {
      if (isLoading) {
        await SplashScreen.preventAutoHideAsync();
      } else {
        SplashScreen.hideAsync();
        await new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
          setIsSplash(false);
        });
      }
    }

    handleSplashScreen();
  }, [isLoading]);

  if (isSplash) {
    return (
      <View
        style={{
          backgroundColor: primaryContainer,
          width: "100%",
          height: "100%",
        }}
      >
        <View style={{marginLeft: 15, marginTop: 50}}>
          <Text style={{fontSize: 30, color: textColor}}>Правила</Text>
          <Text style={{fontSize: 30, color: textColor}}>Технической</Text>
          <Text style={{fontSize: 30, color: textColor}}>Эксплуатации</Text>
          <Text style={{fontSize: 30, color: textColor}}>КХП</Text>
        </View>
        <Image
          style={{
            position: "absolute",
            zIndex: 99,
            top: 45,
            right: 8,
            opacity: 0.5,
          }}
          source={require("@/assets/images/image001.png")}
        />
        <Image
          style={{
            position: "absolute",
            zIndex: 99,
            width: "100%",
            height: "30%",
            bottom: 0,
            right: 0,
          }}
          source={require("@/assets/images/login-page-image.png")}
        />
      </View>
    );
  }

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: true,
          header: () => <Header />,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="favorates" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="chapter" />
      </Stack>
      <Image
        style={{
          position: "absolute",
          zIndex: 99,
          bottom: 8,
          right: 8,
          opacity: 0.5,
          width: 40,
          height: 60,
        }}
        source={require("../../assets/images/image001.png")}
      />
    </>
  );
}

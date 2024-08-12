import { useEffect } from "react";
import { Redirect, SplashScreen, Stack, router } from "expo-router";
import { useSession } from "@/src/modules/auth/ctx";
import { Header } from "@/src/modules/app/ui/header";
import { Image } from "react-native";

export default function AppLayout() {
  const { token, isLoading } = useSession();

  useEffect(() => {
    async function handleSplashScreen() {
      if (isLoading) {
        await SplashScreen.preventAutoHideAsync();
      } else {
        if (!token || token.length === 0) {
          // On web, static rendering will stop here as the user is not authenticated
          // in the headless Node process that the pages are rendered in.
          router.replace("/(auth)/authentication/welcome");
        }
        await SplashScreen.hideAsync();
      }
    }

    handleSplashScreen();
  }, [isLoading]);

  return (
    <><Stack
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
    <Image style={{ position: "absolute", zIndex: 99, bottom: 8, right: 8, opacity: 0.5, width: 40, height: 60}} source={require("../../assets/images/image001.png")}/>
    </>
  );
}

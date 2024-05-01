import {useEffect} from "react";
import {Redirect, SplashScreen, Stack} from "expo-router";
import {useSession} from "@/src/modules/auth/ctx";
import {Header} from "@/src/modules/app/ui/header";

export default function AppLayout() {
    const { token, isLoading } = useSession();


    useEffect(() => {
        async function handleSplashScreen() {
            if (isLoading) {
                await SplashScreen.preventAutoHideAsync()
            } else {
                await SplashScreen.hideAsync()
            }
        }

        handleSplashScreen()
    }, [isLoading])

    if (!token) {
        // On web, static rendering will stop here as the user is not authenticated
        // in the headless Node process that the pages are rendered in.
        return <Redirect href={"/(auth)/authentication/welcome"} />;
    }


    return <Stack
        screenOptions={{
            headerShown: true,
            header: () => (<Header />)
        }}
    >
        <Stack.Screen name="index" />
        <Stack.Screen name="favorates" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="chapter" />
    </Stack>;
}
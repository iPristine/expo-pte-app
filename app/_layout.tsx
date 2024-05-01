import FontAwesome from '@expo/vector-icons/FontAwesome';
import {useFonts} from 'expo-font';
import {Slot} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import {SessionProvider} from "@/src/modules/auth/ctx";
import {observer} from "mobx-react-lite";
import {SectionsModal} from "@/src/modules/section/ui/sections-modal/sections-modal";
import {UserMenuModal} from "@/src/modules/user/ui/user-menu-modal/user-menu-modal";
import {useColorScheme} from "react-native";
import { MD3LightTheme, MD3DarkTheme, PaperProvider } from 'react-native-paper';


// Prevent the splash screen from auto-hiding before asset loading is complete.


export default observer( function RootLayout () {
    const [isFontsLoaded, error] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        ...FontAwesome.font,
    });


    useEffect(() => {
        async function handleSplashScreen() {
            if (isFontsLoaded) {
                await SplashScreen.preventAutoHideAsync()
            } else {
                await SplashScreen.hideAsync()
            }
        }

        handleSplashScreen()
    }, [isFontsLoaded]);

    if (!isFontsLoaded) {
        return null;
    }

    return <RootLayoutNav/>;
})

const RootLayoutNav = () => {
    const colorScheme = useColorScheme();

    const paperTheme =
        colorScheme === 'dark'
            ? MD3DarkTheme
            : MD3LightTheme ;

    return (
            <PaperProvider theme={paperTheme}>
                <SessionProvider >
                    <Slot/>
                    <SectionsModal/>
                    <UserMenuModal/>
                </SessionProvider>
            </PaperProvider>
    );
}


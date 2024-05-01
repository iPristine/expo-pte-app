import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {PaperProvider} from 'react-native-paper';
import {useFonts} from 'expo-font';
import {Slot} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import {SessionProvider} from "@/src/modules/auth/ctx";
import {observer} from "mobx-react-lite";
import {SectionsModal} from "@/src/modules/section/ui/sections-modal/sections-modal";
import {UserMenuModal} from "@/src/modules/user/ui/user-menu-modal/user-menu-modal";

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = observer(() => {
    const [isFontsLoaded, error] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        ...FontAwesome.font,
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (isFontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [isFontsLoaded]);

    if (!isFontsLoaded) {
        return null;
    }

    return <RootLayoutNav/>;
})

const RootLayoutNav = observer(() => {
    // const colorScheme = useColorScheme();

    return (
        <ThemeProvider value={DefaultTheme}>
            <PaperProvider>
                <SessionProvider>
                    <Slot/>
                    <SectionsModal/>
                    <UserMenuModal/>
                </SessionProvider>
            </PaperProvider>
        </ThemeProvider>
    );
})

export default RootLayout;

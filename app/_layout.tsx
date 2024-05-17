import FontAwesome from '@expo/vector-icons/FontAwesome';
import {useFonts} from 'expo-font';
import {Slot} from 'expo-router';
import {SessionProvider} from "@/src/modules/auth/ctx";
import {SectionsModal} from "@/src/modules/section/ui/sections-modal/sections-modal";
import {UserMenuModal} from "@/src/modules/user/ui/user-menu-modal/user-menu-modal";
import {useInitStores} from "@/src/modules/app/interface/init-store/use-init-stores";
import {observer} from "mobx-react-lite";
import {AppProvider} from "@/src/modules/app/app.provider";


export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router';

function RootLayout() {
    const [isFontsLoaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        ...FontAwesome.font,
    });

    if (!isFontsLoaded) {
        return null;
    }

    return <RootLayoutNav/>;
}

const RootLayoutNav = observer(() => {
    const {isLoading} = useInitStores()


    return (
        <SessionProvider isStoreLoading={isLoading}>
            <AppProvider>
                <Slot/>
                <SectionsModal/>
                <UserMenuModal/>
            </AppProvider>
        </SessionProvider>
    );
})


export default RootLayout;

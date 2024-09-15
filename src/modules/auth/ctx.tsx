import React, {useEffect, useMemo, useState} from 'react';
import {useAuthContext} from "@/src/modules/auth/use-auth-context";
import {AuthService} from "@/src/modules/auth/interfaces/services/auth.service";
import {observer} from "mobx-react-lite";
import {AppService} from "@/src/modules/app/interface/services/app.service";
import {useAppContext} from "@/src/modules/app/use-app-context";
import {useColorScheme} from "react-native";
import { SQLiteProvider } from 'expo-sqlite';

const SessionContext = React.createContext<{
    token?: string | null;
    isLoading: boolean;
    themeName: string | undefined,
    fontSize: string | undefined,
}>({
    token: undefined,
    isLoading: true,
    themeName: undefined,
    fontSize: '12',
});

// This hook can be used to access the user info.
export function useSession() {
    const context = React.useContext(SessionContext);

    if (context === undefined) {
        throw new Error("useSession must be used within a SessionProvider")
    }

    return context
}

export const SessionProvider = observer(
    ({
         children,
         isStoreLoading,
     }: {
        children: React.ReactNode
        isStoreLoading: boolean
    }) => {
        const [isLoading, setIsLoading] = useState(true)
        const {authStore} = useAuthContext()
        const {appStore} = useAppContext()
        const colorScheme = useColorScheme()

        useEffect(() => {
            const init = async () => {
                setIsLoading(true)
                const token = await AuthService.loadToken()
                const fontSize = await AppService.loadFontSize()
                const themeName = await AppService.loadThemeName()
                if (token) {
                    authStore.token.setData(token)
                }
                if(fontSize) {
                    appStore.fontSize.setData(fontSize)
                }
                if(themeName) {
                    appStore.themeName.setData(themeName)
                }

                if(!themeName && colorScheme) {
                    appStore.themeName.setData(colorScheme)
                }

                setIsLoading(false)
            }


            init()
        }, [])

        const contextValue = useMemo(
            () => ({
                token: authStore.token?.data || "",
                themeName: appStore.themeName.data || "",
                fontSize: appStore.fontSize.data || "",
                isLoading: isLoading || authStore.token?.isLoading || isStoreLoading,
            }),
            [authStore.token.data, isLoading, authStore.token.isLoading, isStoreLoading]
        )

        return (
            <SessionContext.Provider
                value={contextValue}
            >
                {children}
            </SessionContext.Provider>
        );
    })

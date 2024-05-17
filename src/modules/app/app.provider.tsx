import React, {useEffect, useMemo, useState} from 'react';
import {useAuthContext} from "@/src/modules/auth/use-auth-context";
import {AuthService} from "@/src/modules/auth/interfaces/services/auth.service";
import {observer} from "mobx-react-lite";
import {AppService} from "@/src/modules/app/interface/services/app.service";
import {useAppContext} from "@/src/modules/app/use-app-context";
import {MD3DarkTheme, MD3LightTheme, PaperProvider} from "react-native-paper";
import {useColorScheme} from "react-native";


export const AppProvider = observer(
    ({
         children,
     }: {
        children: React.ReactNode
    }) => {
        const colorScheme = useColorScheme();
        const {appStore} =useAppContext()

        const paperTheme =
            appStore.themeName.data === "dark"
                ? MD3DarkTheme
                : MD3LightTheme ;


        return (
            <PaperProvider theme={paperTheme}>
                {children}
            </PaperProvider>
        );
    })

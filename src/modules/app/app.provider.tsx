import React from "react";
import { observer } from "mobx-react-lite";
import { useAppContext } from "@/src/modules/app/use-app-context";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";

import DarkTheme from "../../themes/DarkTheme";
import LightTheme from "../../themes/LightTheme";

export const AppProvider = observer(
  ({ children }: { children: React.ReactNode }) => {
    const { appStore } = useAppContext();

    const paperTheme =
      appStore.themeName.data === "dark"
        ? { ...MD3DarkTheme, colors: DarkTheme.colors }
        : { ...MD3LightTheme, colors: LightTheme.colors };

    return <PaperProvider theme={paperTheme}>{children}</PaperProvider>;
  }
);

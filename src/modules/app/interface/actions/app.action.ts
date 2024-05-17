import {AppStore} from "@/src/modules/app/interface/stores/app.store";
import {AppService} from "@/src/modules/app/interface/services/app.service";
import {VariantProp} from "react-native-paper/lib/typescript/components/Typography/types";

export class AppAction {
    private static instance: AppAction
    readonly appStore = AppStore.getInstance()

    static getInstance(): AppAction {
        if (!AppAction.instance) {
            AppAction.instance = new AppAction()
        }
        return AppAction.instance
    }

    setTheme = (value: 'dark' | 'light') =>{
        this.appStore.themeName.setData(value)
        AppService.saveTheme(value)
    }

    setFontSize = (value: VariantProp<string>) =>{
        this.appStore.fontSize.setData(value)
    }
}

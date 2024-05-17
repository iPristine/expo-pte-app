import {DataState} from "@/src/lib/di/interface/data-state";
import {VariantProp} from "react-native-paper/lib/typescript/components/Typography/types";

export class AppStore {

    private static instance: AppStore

    static getInstance(): AppStore {
        if (!AppStore.instance) {
            AppStore.instance = new AppStore()
        }
        return AppStore.instance
    }

    fontSize = new DataState<VariantProp<string> | null, string>({isLoading: false})
    themeName = new DataState<string | null, string>({isLoading: false})
}

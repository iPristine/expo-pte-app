import {AppStore} from "@/src/modules/app/interface/stores/app.store";
import {AppAction} from "@/src/modules/app/interface/actions/app.action";

export const useAppContext = () => {
    return {
        appStore: AppStore.getInstance(),
        appAction: AppAction.getInstance()
    }
}
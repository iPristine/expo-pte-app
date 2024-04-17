import {AuthStore} from "@/src/modules/auth/interfaces/stores/auth.store";
import {AuthAction} from "@/src/modules/auth/interfaces/actions/auth.action";

export const useAuthContext = () => {
    return {
        authStore: AuthStore.getInstance(),
        authAction: AuthAction.getInstance()
    }
}
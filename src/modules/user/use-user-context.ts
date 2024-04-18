import {UserAction} from "@/src/modules/user/interfaces/actions/user.action";

export const useUserContext = () => {

    const userAction = UserAction.getInstance()
    const userStore = userAction.userStore


    return {
        userAction: userAction,
        userStore: userStore,
    }
}
import {DataState} from "@/src/lib/di/interface/data-state";

export class AuthStore {

    private static instance: AuthStore

    static getInstance(): AuthStore {
        if (!AuthStore.instance) {
            AuthStore.instance = new AuthStore()
        }
        return AuthStore.instance
    }

    token = new DataState<string | null, string>({isLoading: false})

    username = new DataState<string | null, string>({isLoading: false})
    password = new DataState<string | null, string>({isLoading: false})
    email = new DataState<string | null, string>({isLoading: false})
    fullName = new DataState<string | null, string>({isLoading: false})


}

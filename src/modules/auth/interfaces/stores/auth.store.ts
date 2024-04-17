import { Validator } from "@/src/lib/validator"
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

    loginValidator = new Validator({
        username: Validator.scheme.string().min(1),
        password: Validator.scheme.string().min(1),
    })

    registerValidator = new Validator({
        username: Validator.scheme.string().min(1),
        password: Validator.scheme.string().min(1),
        email: Validator.scheme.string().email(),
        fullName: Validator.scheme.string().min(1),
    })

}

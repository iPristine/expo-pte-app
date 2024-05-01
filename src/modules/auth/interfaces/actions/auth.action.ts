import { router } from "expo-router"
import { loginUseCase } from "@/src/modules/auth/use-cases/login/login.use-case"
import { SecureStore } from "@/src/lib/secure-store"
import { SECURE_STORAGE_KEYS } from "@/src/constants"
import { AuthStore } from "../stores/auth.store"
import {AuthService} from "@/src/modules/auth/interfaces/services/auth.service";
import {registerUseCase} from "@/src/modules/auth/use-cases/register/register.use-case";

export class AuthAction {
    private static instance: AuthAction
    readonly authStore = AuthStore.getInstance()

    static getInstance(): AuthAction {
        if (!AuthAction.instance) {
            AuthAction.instance = new AuthAction()
        }
        return AuthAction.instance
    }

     handleLogin = async (): Promise<void> => {
        console.log("handleLogin")
        this.authStore.token.setError(undefined)
        const result = this.authStore.loginValidator.submit()
        if (!result.isValid) {
            return
        }

        this.authStore.token.setIsLoading(true)

        const { username, password } = result.values
        const tokenResult = await loginUseCase({ username, password })
        if (tokenResult.isErr()) {
            this.authStore.token.setError(tokenResult.getError().message)
        } else {
            const currentToken = tokenResult.getValue()

            this.authStore.token.setData(currentToken.accessToken)
            await AuthService.saveToken(currentToken.accessToken)

            this.authStore.loginValidator.reset()
            router.replace('/')
        }

        this.authStore.token.setIsLoading(false)
    }

    handleSignOut = () => {
        this.authStore.token.setData(null)
        AuthService.clearToken()
    }

    handleRegister = async () =>{
        const result = this.authStore.registerValidator.submit()
        if (!result.isValid) {
            console.log('register fields are invalid')
            return
        }

        const { username, password, email, fullName } = result.values
        const registerResult = await registerUseCase({ username, password, email, fullName })
        if(!registerResult.isErr()){
            router.push('/')
        }
    }

    async deviceToken() {
        const deviceToken = await SecureStore.load(SECURE_STORAGE_KEYS.deviceToken)

        return typeof deviceToken === "string" ? deviceToken : null
    }



}

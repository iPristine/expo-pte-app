import {SecureStore} from "@/src/lib/secure-store";
import {SECURE_STORAGE_KEYS} from "@/src/constants";

export class AuthService {
    static async saveToken(token: string) {
        await SecureStore.save(SECURE_STORAGE_KEYS.token, token)
    }

    static async loadToken(): Promise<string | null> {
        const token = await SecureStore.load(SECURE_STORAGE_KEYS.token)
        return token ? (token as string) : null
    }

    static async clearToken() {
        await SecureStore.clear(SECURE_STORAGE_KEYS.token)
    }
}
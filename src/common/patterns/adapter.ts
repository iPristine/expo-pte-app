import {AuthStore} from "@/src/modules/auth/interfaces/stores/auth.store";

export abstract class Adapter {
     authStore = AuthStore.getInstance()


    public getAuthHeaders = async (): Promise<Record<string, string>> => {
        return {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.authStore.token.data}`
        }
    }

    public async getGuestHeaders(): Promise<Record<string, string>> {
        return {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    }
}

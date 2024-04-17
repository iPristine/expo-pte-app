import { SecureStore } from "@/src/lib/secure-store"
import { ApiClientValueObject } from "@/src/modules/api/domain/value-objects/api-client.value-object"
import { SECURE_STORAGE_KEYS } from "@/src/constants"

export class ApiClientService {
  static async saveAuthData(data: ApiClientValueObject) {
    await SecureStore.save(SECURE_STORAGE_KEYS.authData, data)
  }

  static async loadAuthData(): Promise<ApiClientValueObject | null> {
    const authData = await SecureStore.load(SECURE_STORAGE_KEYS.authData)
    return authData ? (authData as ApiClientValueObject) : null
  }

  static async clearAuthData(): Promise<void> {
    await SecureStore.clear(SECURE_STORAGE_KEYS.authData)
  }
}

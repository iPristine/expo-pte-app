import { ApiClientValueObject } from "@/src/modules/api/domain/value-objects/api-client.value-object"
import { ApiClientService } from "../services/api-client.service"

export class ApiClientStore {
  private static instance: ApiClientStore

  static getInstance(): ApiClientStore {
    if (!ApiClientStore.instance) {
      ApiClientStore.instance = new ApiClientStore()
    }

    return ApiClientStore.instance
  }

  private token: string = ""
  private locale: string = ""
  private store: string = ""
  private platformKey: string = ""
  private id?: number

  async init() {
    const authData = await ApiClientService.loadAuthData()
    if (authData) {
      this.setData(authData)
    }
  }

  getToken(): string {
    return this.token
  }

  getLocale(): string {
    return this.locale
  }

  getPlatformKey(): string {
    return this.platformKey
  }

  getStore(): string {
    return this.store
  }

  getId(): number | undefined {
    return this.id
  }

  setData({
    locale,
    token,
    platformKey,
    store,
    id,
  }: ApiClientValueObject): void {
    this.token = token
    this.locale = locale
    this.platformKey = platformKey
    this.store = store
    this.id = id
  }

  clearStore() {
    this.token = ""
    this.locale = ""
    this.store = ""
    this.platformKey = ""
    this.id = 0
  }
}

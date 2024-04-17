import { ApiClientValueObject } from "@/src/modules/api/domain/value-objects/api-client.value-object"
import { ApiClientStore } from "../stores/api-client.store"
import { ApiClientService } from "../services/api-client.service"

export class ApiClientAction {
  private static instance: ApiClientAction

  static getInstance(): ApiClientAction {
    if (!ApiClientAction.instance) {
      ApiClientAction.instance = new ApiClientAction()
    }

    return ApiClientAction.instance
  }

  readonly apiClientStore = ApiClientStore.getInstance()

  async handleSaveAuthData(data: ApiClientValueObject) {
    this.apiClientStore.setData(data)

    await ApiClientService.saveAuthData(data)
  }

  async handleClearAuthData() {
    this.apiClientStore.clearStore()

    await ApiClientService.clearAuthData()
  }
}

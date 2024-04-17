import { Result, Ok, Err } from "fnscript"
import { ApiClient } from "@/src/modules/api/interface/services/api-client"
import { ApiClientAction } from "@/src/modules/api/interface/actions/api-client.action"
import { Adapter } from "@/src/common/patterns/adapter"
import {BASE_API_ENDPOINT} from "@/config"
import {LoginResponse} from "@/src/modules/auth/infra/types/login.response";
import {LoginEntity} from "@/src/modules/auth/infra/types/login.entity";
import {mapToAuthData} from "@/src/modules/auth/infra/mappers/map-to-auth-data";

export class AuthAdapter extends Adapter {
  private apiClient = ApiClient.getInstance()
  private apiClientAction = ApiClientAction.getInstance()

  async login(
    username: string,
    password: string
  ): Promise<Result<LoginEntity, Error>> {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    const { ok, json, status } = await this.apiClient.basic.post<LoginResponse>(
      `${BASE_API_ENDPOINT}/token`,
      {
        body: formData,
        headers: { ...(await this.getGuestHeaders()) },
      }
    )
    if (!ok || !json) {
      return Err(new Error(`Login failed ${status}`))
    }

    const result = mapToAuthData(json)

    return Ok(result)
  }

}

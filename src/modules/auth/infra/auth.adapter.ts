import { Result, Ok, Err } from "fnscript"
import { ApiClient } from "@/src/modules/api/interface/services/api-client"
import { Adapter } from "@/src/common/patterns/adapter"
import {BASE_API_ENDPOINT} from "@/config"
import {LoginResponse} from "@/src/modules/auth/infra/types/login.response";
import {LoginEntity} from "@/src/modules/auth/infra/types/login.entity";
import {mapToAuthData} from "@/src/modules/auth/infra/mappers/map-to-auth-data";

export class AuthAdapter extends Adapter {
  private apiClient = ApiClient.getInstance()

  async login(
    username: string,
    password: string
  ): Promise<Result<LoginEntity, Error>> {
    const { ok, json, status } = await this.apiClient.basic.post<LoginResponse>(
      `${BASE_API_ENDPOINT}/token`,
      {
        headers: { ...(await this.getGuestHeaders()) },
        body: `grant_type=&username=${username}&password=${password}&scope=&client_id=&client_secret=`
      }
    )
    if (!ok || !json) {
      return Err(new Error(`Login failed ${status}`))
    }

    const result = mapToAuthData(json)

    return Ok(result)
  }

  async register(
    username: string,
    password: string,
    email: string,
    fullName: string
  ): Promise<Result<LoginEntity, Error>> {
    const { ok, json, status } = await this.apiClient.basic.post<LoginResponse>(
      `${BASE_API_ENDPOINT}/register`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        body: {username, password, email, full_name: fullName}
      }
    )
    if (!ok || !json) {
      return Err(new Error(`Register failed ${status}`))
    }

    const result = mapToAuthData(json)

    return Ok(result)
  }


}

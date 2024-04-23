import { Result, Ok, Err } from "fnscript"
import { ApiClient } from "@/src/modules/api/interface/services/api-client"
import { Adapter } from "@/src/common/patterns/adapter"
import {BASE_API_ENDPOINT} from "@/config"
import {ChapterEntity} from "@/src/modules/chapter/infra/types/chapter.entity";
import {UserEntity} from "@/src/modules/user/infra/types/user.entity";
import {UserResponse} from "@/src/modules/user/infra/types/user.response";
import {userResponseMapper} from "@/src/modules/user/infra/mappers/user-response.mapper";
import {AuthStore} from "@/src/modules/auth/interfaces/stores/auth.store";

export class UserAdapter extends Adapter {
    private apiClient = ApiClient.getInstance()

    async loadUser(): Promise<Result<UserEntity, Error>> {
        const { ok, json, status } = await this.apiClient.secured.get<UserResponse>(
            `${BASE_API_ENDPOINT}/users/me`,
            {
                headers: { ...(await this.getAuthHeaders()) },
            }
        )

        if (!ok || !json) {
            return Err(new Error(`User loading failed ${status}`))
        }

        const result = userResponseMapper(json)

        return Ok(result)
    }

    async loadFavorates(): Promise<Result<ChapterEntity[], Error>> {
        const { ok, json, status } = await this.apiClient.secured.get<ChapterEntity[]>(
            `${BASE_API_ENDPOINT}/users/favorates`,
            {
                headers: { ...(await this.getAuthHeaders()) },
            }
        )

        if (!ok || !json) {
            return Err(new Error(`Favorates loading failed ${status}`))
        }

        const result = json

        return Ok(result)
    }

    async addToFavorates(chapterId: string): Promise<Result<ChapterEntity[], Error>> {
        const { ok, json, status } = await this.apiClient.secured.post<ChapterEntity[]>(
            `${BASE_API_ENDPOINT}/users/favorates/${chapterId}`,
            {
                headers: { ...(await this.getAuthHeaders()) },
            }
        )

        if (!ok || !json) {
            return Err(new Error(`Favorates adding failed ${status}`))
        }

        const result = json

        return Ok(result)
    }

}

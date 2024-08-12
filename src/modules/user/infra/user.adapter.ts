import { Result, Ok, Err } from "fnscript"
import { ApiClient } from "@/src/modules/api/interface/services/api-client"
import { Adapter } from "@/src/common/patterns/adapter"
import {BASE_API_ENDPOINT} from "@/config"
import {ChapterEntity} from "@/src/modules/chapter/infra/types/chapter.entity";
import {UserEntity} from "@/src/modules/user/infra/types/user.entity";
import {UserResponse} from "@/src/modules/user/infra/types/user.response";
import {userResponseMapper} from "@/src/modules/user/infra/mappers/user-response.mapper";
import { SecureStore } from "@/src/lib/secure-store";
import { SECURE_STORAGE_KEYS } from "@/src/constants";

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
        // const { ok, json, status } = await this.apiClient.secured.get<ChapterEntity[]>(
        //     `${BASE_API_ENDPOINT}/users/favorates`,
        //     {
        //         headers: { ...(await this.getAuthHeaders()) },
        //     }
        // )

        const favoritesIds = await SecureStore.load(SECURE_STORAGE_KEYS.favorites);

        if (!favoritesIds || typeof favoritesIds === "string") {
            return Err(new Error(`У вас нет избранных глав`))
        }

        const ids = Object.entries(favoritesIds).map<string>(([key, value]) => {
            return value
        })

        console.log("ids", ids)

        const { ok, json, status } = await this.apiClient.secured.post<ChapterEntity[]>(
            `${BASE_API_ENDPOINT}/chapters/many`,
            {
                headers: { ...(await this.getAuthHeaders()) },
                body: { ids },
            }
        );

        console.log("json", json)

        if (!ok || !json) {
            return Err(new Error(`Favorates loading failed ${status}`))
        }

        return Ok(json)
    }

    async addToFavorates(chapterId: string): Promise<Result<ChapterEntity[], Error>> {
        // const { ok, json, status } = await this.apiClient.secured.post<ChapterEntity[]>(
        //     `${BASE_API_ENDPOINT}/users/favorates/${chapterId}`,
        // {
        //     headers: { ...(await this.getAuthHeaders()) },
        //     body: { chapterId }
        // }
        // )

        const favoritesIds = await SecureStore.load(SECURE_STORAGE_KEYS.favorites);

        if (typeof favoritesIds === "string") {
            return Err(new Error(`Favorates loading failed`))
        }

        const ids = Object.entries(favoritesIds ? favoritesIds : []).map(([key, value]) => {
            return value
        })

        await ids.push(chapterId)

        await SecureStore.save(SECURE_STORAGE_KEYS.favorites, [...ids])

        const { ok, json, status } = await this.apiClient.secured.post<ChapterEntity[]>(
            `${BASE_API_ENDPOINT}/chapters/many`,
            {
                body: { 'ids': ids }
            }
        );

        if (!ok || !json) {
            return Err(new Error(`Favorates adding failed ${status}`))
        }
        const result = json

        return Ok(result)
    }

    async removeFromFavorates(chapterId: string): Promise<Result<ChapterEntity[], Error>> {
        const { ok, json, status } = await this.apiClient.secured.delete<ChapterEntity[]>(
            `${BASE_API_ENDPOINT}/users/favorates/${chapterId}`,
            {
                headers: { ...(await this.getAuthHeaders()) },
                body: { chapterId }

            }
        )

        if (!ok || !json) {
            return Err(new Error(`Favorates removing failed ${status}`))
        }

        const result = json

        return Ok(result)
    }

}

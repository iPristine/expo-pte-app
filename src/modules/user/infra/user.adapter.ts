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
import { FavoritesEntity, UserFavoritesEntity } from "./types/favoraties.entity";

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

    async loadFavorates(): Promise<Result<UserFavoritesEntity[], Error>> {
        // const { ok, json, status } = await this.apiClient.secured.get<ChapterEntity[]>(
        //     `${BASE_API_ENDPOINT}/users/favorates`,
        //     {
        //         headers: { ...(await this.getAuthHeaders()) },
        //     }
        // )

        const favorites = await SecureStore.load(SECURE_STORAGE_KEYS.favorites);

        if (!favorites || typeof favorites === "string") {
            return Err(new Error(`У вас нет избранных глав`))
        }

        const fts = await Object.entries(favorites ? favorites : []).map<UserFavoritesEntity>(([key, value]) => {

            return {
                id: value.id,
                name: value.name,
                favorites: value.favorites
            }
        });

        return Ok(fts)
    }

    async addToFavorates(chapterId: string, name: string, description: string): Promise<Result<UserFavoritesEntity[], Error>> {
        // const { ok, json, status } = await this.apiClient.secured.post<ChapterEntity[]>(
        //     `${BASE_API_ENDPOINT}/users/favorates/${chapterId}`,
        // {
        //     headers: { ...(await this.getAuthHeaders()) },
        //     body: { chapterId }
        // }
        // )

        const favorites = await SecureStore.load(SECURE_STORAGE_KEYS.favorites);

        const fts = await Object.entries(favorites ? favorites : []).map<UserFavoritesEntity>(([key, value], index) => {
            if (chapterId === value.id) {
                return {
                    id: value.id,
                    name: value.name,
                    favorites: [...value.favorites, new FavoritesEntity(description)]
                }
            }

            return {
                id: value.id,
                name: value.name,
                favorites: value.favorites
            }
        });

        if ((await fts.filter(f => f.id === chapterId).length) === 0) {
            await fts.push({
                id: chapterId,
                name,
                favorites: [new FavoritesEntity(description)]
            })
        }

        console.log(fts)

        await SecureStore.save(SECURE_STORAGE_KEYS.favorites, [...fts]);

        return Ok(fts)
    }

    async removeFromFavorates(chapterId: string): Promise<Result<UserFavoritesEntity[], Error>> {
        // const { ok, json, status } = await this.apiClient.secured.delete<ChapterEntity[]>(
        //     `${BASE_API_ENDPOINT}/users/favorates/${chapterId}`,
        //     {
        //         headers: { ...(await this.getAuthHeaders()) },
        //         body: { chapterId }

        //     }
        // )

        // if (!ok || !json) {
        //     return Err(new Error(`Favorates removing failed ${status}`))
        // }

        // const result = json

        const favorites = await SecureStore.load(SECURE_STORAGE_KEYS.favorites);

        if (typeof favorites === "string" || !favorites) {
            return Err(new Error(`Favorates loading failed`))
        }

        const fts = await Object.entries(favorites ? favorites : []).map<UserFavoritesEntity>(([key, value]) => {
            return {
                id: value.id,
                name: value.name,
                favorites: value.favorites
            }
        }).filter(f => f.id !== chapterId);

        await SecureStore.save(SECURE_STORAGE_KEYS.favorites, [...fts]);

        return Ok(fts)
    }

}

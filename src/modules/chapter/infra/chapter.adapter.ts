import { Result, Ok, Err } from "fnscript"
import { ApiClient } from "@/src/modules/api/interface/services/api-client"
import { Adapter } from "@/src/common/patterns/adapter"
import {BASE_API_ENDPOINT} from "@/config"
import {ChapterEntity} from "@/src/modules/chapter/infra/types/chapter.entity";
import {SearchEntity} from "@/src/modules/chapter/infra/types/search.entity";

export class ChapterAdapter extends Adapter {
    private apiClient = ApiClient.getInstance()

    async loadChapters(): Promise<Result<ChapterEntity[], Error>> {
        const { ok, json, status } = await this.apiClient.secured.get<ChapterEntity[]>(
            `${BASE_API_ENDPOINT}/chapter`,
            {
                headers: { ...(await this.getAuthHeaders()) },
            }
        )

        if (!ok || !json) {
            return Err(new Error(`Chapters loading failed ${status}`))
        }

        const result = json

        return Ok(result)
    }

    async loadChapter(id: string): Promise<Result<ChapterEntity, Error>> {
        const { ok, json, status } = await this.apiClient.secured.get<ChapterEntity>(
            `${BASE_API_ENDPOINT}/chapter/${id}`,
            {
                headers: { ...(await this.getAuthHeaders()) },
            }
        )

        if (!ok || !json) {
            return Err(new Error(`Chapter loading failed ${status}`))
        }

        const result = json

        return Ok(result)
    }

    async searchChapters(search: string): Promise<Result<SearchEntity[], Error>> {
        const { ok, json, status } = await this.apiClient.secured.get<SearchEntity[]>(
            `${BASE_API_ENDPOINT}/search?query=${search}`,
            {
                headers: { ...(await this.getAuthHeaders()) },
            }
        )

        if (!ok || !json) {
            return Err(new Error(`Chapters loading failed ${status}`))
        }

        const result = json

        return Ok(result)
    }

}

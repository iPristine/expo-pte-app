import { Result, Ok, Err } from "fnscript"
import { ApiClient } from "@/src/modules/api/interface/services/api-client"
import { Adapter } from "@/src/common/patterns/adapter"
import {BASE_API_ENDPOINT} from "@/config"
import {SectionEntity} from "@/src/modules/section/infra/types/section.entity";

export class SectionAdapter extends Adapter {
    private apiClient = ApiClient.getInstance()

    async loadSections(): Promise<Result<SectionEntity[], Error>> {
        const { ok, json, status } = await this.apiClient.secured.get<SectionEntity[]>(
            `${BASE_API_ENDPOINT}/section`,
            {
                headers: { ...(await this.getAuthHeaders()) },
            }
        )

        if (!ok || !json) {
            return Err(new Error(`Sections loading failed ${status}`))
        }

        const result = json

        return Ok(result)
    }

    async loadSection(id: string): Promise<Result<SectionEntity, Error>> {
        const { ok, json, status } = await this.apiClient.secured.get<SectionEntity>(
            `${BASE_API_ENDPOINT}/section/${id}`,
            {
                headers: { ...(await this.getAuthHeaders()) },
            }
        )

        if (!ok || !json) {
            return Err(new Error(`Section loading failed ${status}`))
        }

        const result = json

        return Ok(result)
    }

}

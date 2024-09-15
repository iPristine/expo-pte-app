import { Result, Ok, Err } from "fnscript"
import { ApiClient } from "@/src/modules/api/interface/services/api-client"
import { Adapter } from "@/src/common/patterns/adapter"
import {SectionEntity} from "@/src/modules/section/infra/types/section.entity";
import { getDatabase } from "@/src/common/Database";
import { ChapterEntity } from "../../chapter/infra/types/chapter.entity";

export class SectionAdapter extends Adapter {
    private apiClient = ApiClient.getInstance()

    async loadSections(): Promise<Result<SectionEntity[], Error>> {
        const db = await getDatabase();
        // const { ok, json, status } = await this.apiClient.secured.get<SectionEntity[]>(
        //     `${BASE_API_ENDPOINT}/section`,
        //     {
        //         headers: { ...(await this.getAuthHeaders()) },
        //     }
        // )

        // if (!ok || !json) {
        //     return Err(new Error(`Sections loading failed ${status}`))
        // }

        const result = await db.getAllAsync<SectionEntity>('SELECT * FROM section');

        return Ok(result)
    }

    async loadSection(id: string): Promise<Result<SectionEntity, Error>> {
        // const { ok, json, status } = await this.apiClient.secured.get<SectionEntity>(
        //     `${BASE_API_ENDPOINT}/section/${id}`,
        //     {
        //         headers: { ...(await this.getAuthHeaders()) },
        //     }
        // )

        // if (!ok || !json) {
        //     return Err(new Error(`Section loading failed ${status}`))
        // }

        // const result = json

        const db = await getDatabase();
        const section = await db.getFirstAsync<SectionEntity>(`SELECT * FROM section WHERE id = ${id}`, [id]);

        if (!section) {
            return Err(new Error(`Section loading failed`))
        }

        const chs = await section?.chapterIds.split(',').map(async (chapterId: string): Promise<ChapterEntity> => {
            const chapter = await db.getFirstAsync<ChapterEntity>(`SELECT * FROM chapter WHERE id = ${chapterId}`, [chapterId]);
            if (!chapter) {
                throw Err(new Error(`Chapter loading failed`))
            }
            return chapter;
        })
        if (chs === undefined) {
            return Err(new Error(`Chapter loading failed`))
        }
        const chapters = await Promise.all(chs);

        return Ok({
            ...section,
            chapters: chapters
        })
    }

}

import {ChapterAdapter} from "@/src/modules/chapter/infra/chapter.adapter";
import {Ok, Result} from "fnscript";
import {SearchEntity} from "@/src/modules/chapter/infra/types/search.entity";

export async function loadChaptersBySearchUseCase(search: string): Promise<Result<SearchEntity[], Error>>  {
    const adapter = new ChapterAdapter()

    const result = await adapter.searchChapters(search)


    if (result.isErr()) {
        return result
    }

    return Ok(result.getValue())
}
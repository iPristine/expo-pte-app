import {ChapterAdapter} from "@/src/modules/chapter/infra/chapter.adapter";
import {Ok, Result} from "fnscript";
import {ChapterEntity} from "@/src/modules/chapter/infra/types/chapter.entity";

export type Input = {
    id: string
}
export async function loadChapterUseCase({id}: Input): Promise<Result<ChapterEntity, Error>>  {
    const adapter = new ChapterAdapter()

    const result = await adapter.loadChapter(id)


    if (result.isErr()) {
        return result
    }

    return Ok(result.getValue())
}
import {Ok, Result} from "fnscript";
import {ChapterEntity} from "@/src/modules/chapter/infra/types/chapter.entity";
import {UserAdapter} from "@/src/modules/user/infra/user.adapter";

export async function loadFavoratesUseCase(): Promise<Result<ChapterEntity[], Error>>  {
    const adapter = new UserAdapter()

    const result = await adapter.loadFavorates()


    if (result.isErr()) {
        return result
    }

    return Ok(result.getValue())
}
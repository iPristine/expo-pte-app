import {Ok, Result} from "fnscript";
import {ChapterEntity} from "@/src/modules/chapter/infra/types/chapter.entity";
import {UserAdapter} from "@/src/modules/user/infra/user.adapter";
import { UserFavoritesEntity } from "../infra/types/favoraties.entity";

export type Input = {
    chapterId: string
}
export async function removeFromFavoratesUseCase ({chapterId}: Input): Promise<Result<UserFavoritesEntity[], Error>>  {
    const adapter = new UserAdapter()

    const result = await adapter.removeFromFavorates(chapterId)


    if (result.isErr()) {
        return result
    }

    return Ok(result.getValue())
}
import {Ok, Result} from "fnscript";
import {ChapterEntity} from "@/src/modules/chapter/infra/types/chapter.entity";
import {UserAdapter} from "@/src/modules/user/infra/user.adapter";
import { UserFavoritesEntity } from "../infra/types/favoraties.entity";

export type Input = {
    chapterId: string,
    name: string,
    description: string
}
export async function addToFavoratesUseCase ({chapterId, name, description}: Input): Promise<Result<UserFavoritesEntity[], Error>>  {
    const adapter = new UserAdapter()

    const result = await adapter.addToFavorates(chapterId, name, description)


    if (result.isErr()) {
        return result
    }

    return Ok(result.getValue())
}
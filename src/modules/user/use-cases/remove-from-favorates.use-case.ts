import {Ok, Result} from "fnscript";
import {UserAdapter} from "@/src/modules/user/infra/user.adapter";
import { UserFavoritesEntity } from "../infra/types/favoraties.entity";

export type Input = {
    chapterId: string,
    index: number
}
export async function removeFromFavoratesUseCase ({chapterId, index}: Input): Promise<Result<UserFavoritesEntity[], Error>>  {
    const adapter = new UserAdapter()

    const result = await adapter.removeFromFavorates(chapterId, index)


    if (result.isErr()) {
        return result
    }

    return Ok(result.getValue())
}
import {Ok, Result} from "fnscript";
import {UserEntity} from "@/src/modules/user/infra/types/user.entity";
import {UserAdapter} from "@/src/modules/user/infra/user.adapter";

export type Input = {
    id: string
}
export async function loadUserUseCase(): Promise<Result<UserEntity, Error>>  {
    const adapter = new UserAdapter()

    const result = await adapter.loadUser()


    if (result.isErr()) {
        return result
    }

    return Ok(result.getValue())
}
import { Result, Ok } from "fnscript"
import { AuthAdapter } from "@/src/modules/auth/infra/auth.adapter"
import {LoginEntity} from "@/src/modules/auth/infra/types/login.entity";

type Input = {
    username: string
    password: string
    fullName: string
    email: string
}

export async function registerUseCase(
    input: Input
): Promise<Result<LoginEntity, Error>> {
    const adapter = new AuthAdapter()
    const userResult = await adapter.register(
        input.username,
        input.password,
        input.email,
        input.fullName
    )

    if (userResult.isErr()) {
        return userResult
    }

    return Ok(userResult.getValue())
}

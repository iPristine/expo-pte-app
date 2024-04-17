import { Result, Ok } from "fnscript"
import { AuthAdapter } from "@/src/modules/auth/infra/auth.adapter"
import {LoginEntity} from "@/src/modules/auth/infra/types/login.entity";

type Input = {
  username: string
  password: string
}

export async function loginUseCase(
  input: Input
): Promise<Result<LoginEntity, Error>> {
  const adapter = new AuthAdapter()
  const userResult = await adapter.login(
    input.username,
    input.password
  )

  if (userResult.isErr()) {
    return userResult
  }

  return Ok(userResult.getValue())
}

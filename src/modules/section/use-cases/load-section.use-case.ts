import {Ok, Result} from "fnscript";
import {SectionAdapter} from "@/src/modules/section/infra/section.adapter";
import {SectionEntity} from "@/src/modules/section/infra/types/section.entity";

export type Input = {
    id: string
}
export async function loadSectionUseCase({id}: Input): Promise<Result<SectionEntity, Error>>  {
    const adapter = new SectionAdapter()

    const result = await adapter.loadSection(id)


    if (result.isErr()) {
        return result
    }

    return Ok(result.getValue())
}
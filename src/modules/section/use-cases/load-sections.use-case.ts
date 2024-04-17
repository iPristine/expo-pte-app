import {Ok, Result} from "fnscript";
import {SectionAdapter} from "@/src/modules/section/infra/section.adapter";
import {SectionEntity} from "@/src/modules/section/infra/types/section.entity";

export async function loadSectionsUseCase(): Promise<Result<SectionEntity[], Error>>  {
    const adapter = new SectionAdapter()

    const result = await adapter.loadSections()


    if (result.isErr()) {
        return result
    }

    return Ok(result.getValue())
}
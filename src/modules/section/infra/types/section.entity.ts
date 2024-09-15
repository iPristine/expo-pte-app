import {ChapterEntity} from "@/src/modules/chapter/infra/types/chapter.entity";

export type SectionEntity = {
    id: string
    name: string
    chapterIds: string
    chapters: ChapterEntity[]
}
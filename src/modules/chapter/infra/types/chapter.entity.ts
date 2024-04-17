import {ChapterContentEntity} from "./chapter-content.entity";

export type ChapterEntity = {
    id: string
    name: string
    content: ChapterContentEntity[] | null
}
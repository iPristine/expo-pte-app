import {ChapterContentEntity} from "@/src/modules/chapter/infra/types/chapter-content.entity";

export type SearchEntity = {
    id: number,
    chapterId: string,
    chapterName: string,
    sectionName: string,
    iter: number,
    contentElement: ChapterContentEntity
}
import {DataState} from "@/src/lib/di/interface/data-state";
import {ChapterEntity} from "@/src/modules/chapter/infra/types/chapter.entity";

export class ChaptersStore {
  private static instance: ChaptersStore

  static getInstance(): ChaptersStore {
    if (!ChaptersStore.instance) {
      ChaptersStore.instance = new ChaptersStore()
    }

    return ChaptersStore.instance
  }


  chapters = new DataState<ChapterEntity[], string>({ isLoading: false })

  setChapters(chapters: ChapterEntity[]): void {
    this.chapters.setData(chapters)
  }
}
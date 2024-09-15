import {DataState} from "@/src/lib/di/interface/data-state";
import {ChapterEntity} from "@/src/modules/chapter/infra/types/chapter.entity";
import {SearchEntity} from "@/src/modules/chapter/infra/types/search.entity";

export class ChaptersStore {
  private static instance: ChaptersStore

  static getInstance(): ChaptersStore {
    if (!ChaptersStore.instance) {
      ChaptersStore.instance = new ChaptersStore()
    }

    return ChaptersStore.instance
  }

  searchQuery = new DataState<string| null, string>()

  searchEntities = new DataState<SearchEntity[], string>({ isLoading: false })

  isSearching = new DataState<boolean, string>({ isLoading: false })

  chapters = new DataState<ChapterEntity[], string>({ isLoading: false })
  chapterDetails = new DataState<ChapterEntity, string>({ isLoading: true })
  setChapters(chapters: ChapterEntity[]): void {
    this.chapters.setData(chapters)
  }
  setChapterDetails(chapter: ChapterEntity): void {
    this.chapterDetails.setData(chapter)
  }

}
import {ChaptersStore} from "@/src/modules/chapter/interfaces/stores/chapters.store";
import {loadChaptersUseCase} from "@/src/modules/chapter/use-cases/load-chapters.use-case";
import {loadChapterUseCase} from "@/src/modules/chapter/use-cases/load-chapter.use-case";
import {loadChaptersBySearchUseCase} from "@/src/modules/chapter/use-cases/load-chapters-by-search.use-case";

export class ChaptersAction {
    private static instance: ChaptersAction

    readonly chaptersStore = ChaptersStore.getInstance()


    static getInstance(): ChaptersAction {
        if (!ChaptersAction.instance) {
            ChaptersAction.instance = new ChaptersAction()
        }

        return ChaptersAction.instance
    }

    loadChapters = async () => {
        this.chaptersStore.chapters.setIsLoading(true)
        const result = await loadChaptersUseCase()


        if (result.isErr()) {
            this.chaptersStore.chapters.setError(
                result.getError().message
            )
        } else {
            this.chaptersStore.chapters.setData(result.getValue())
            this.chaptersStore.chapters.setError(undefined)
        }

        this.chaptersStore.chapters.setIsLoading(false)
    }

    loadChapter = async (id: string) => {
        this.chaptersStore.chapterDetails.setIsLoading(true)
        const result = await loadChapterUseCase({id})

        if (result.isErr()) {
            this.chaptersStore.chapterDetails.setError(
                result.getError().message
            )
        } else {
            this.chaptersStore.chapterDetails.setData(result.getValue())
            this.chaptersStore.chapterDetails.setError(undefined)
        }

        this.chaptersStore.chapterDetails.setIsLoading(false)
    }


    searchChapters = async () => {

        this.chaptersStore.chapters.setIsLoading(true)

        const result = await loadChaptersBySearchUseCase(this.chaptersStore.searchValidator.values.searchQuery)

        if (result.isErr()) {
            this.chaptersStore.chapters.setError(
                result.getError().message
            )
        } else {
            this.chaptersStore.chapters.setData(result.getValue())
            this.chaptersStore.chapters.setError(undefined)
        }

        this.chaptersStore.chapters.setIsLoading(false)
    }

}
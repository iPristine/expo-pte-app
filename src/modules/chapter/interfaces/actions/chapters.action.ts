import {ChaptersStore} from "@/src/modules/chapter/interfaces/stores/chapters.store";
import {loadChaptersUseCase} from "@/src/modules/chapter/use-cases/load-chapters.use-case";

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
        console.log('loadChapters')
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

}
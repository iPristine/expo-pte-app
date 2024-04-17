import {ChaptersAction} from "@/src/modules/chapter/interfaces/actions/chapters.action";

export const useChapterContext = () => {

    const chaptersAction = ChaptersAction.getInstance()
    const chaptersStore = chaptersAction.chaptersStore


    return {
        chaptersAction,
        chaptersStore,
    }
}
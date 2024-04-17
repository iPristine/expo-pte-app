import {SectionsAction} from "@/src/modules/section/interfaces/actions/sections.action";

export const useSectionContext = () => {

    const sectionsAction = SectionsAction.getInstance()
    const sectionsStore = sectionsAction.sectionsStore


    return {
        sectionsAction,
        sectionsStore,
    }
}
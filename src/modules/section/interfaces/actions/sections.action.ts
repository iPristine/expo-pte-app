import {SectionsStore} from "@/src/modules/section/interfaces/stores/sections.store";
import {loadSectionsUseCase} from "@/src/modules/section/use-cases/load-sections.use-case";
import {loadSectionUseCase} from "@/src/modules/section/use-cases/load-section.use-case";

export class SectionsAction {
    private static instance: SectionsAction

    readonly sectionsStore = SectionsStore.getInstance()

    static getInstance(): SectionsAction {
        if (!SectionsAction.instance) {
            SectionsAction.instance = new SectionsAction()
        }

        return SectionsAction.instance
    }

    loadSections = async () => {
        this.sectionsStore.sections.setIsLoading(true)
        const result = await loadSectionsUseCase()


        if (result.isErr()) {
            this.sectionsStore.sections.setError(
                result.getError().message
            )
        } else {
            this.sectionsStore.sectionDetailsId.setData(result.getValue()[0].id)
            this.sectionsStore.sections.setData(result.getValue())
            this.sectionsStore.sections.setError(undefined)
        }

        this.sectionsStore.sections.setIsLoading(false)
    }

    loadSection = async (id: string) => {
        this.sectionsStore.sectionDetails.setIsLoading(true)
        const result = await loadSectionUseCase({id})

        if (result.isErr()) {
            this.sectionsStore.sectionDetails.setError(
                result.getError().message
            )
        } else {
            this.sectionsStore.sectionDetails.setData(result.getValue())
            this.sectionsStore.sectionDetails.setError(undefined)
        }

        this.sectionsStore.sectionDetails.setIsLoading(false)
    }

}
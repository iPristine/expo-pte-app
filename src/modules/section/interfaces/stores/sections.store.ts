import {DataState} from "@/src/lib/di/interface/data-state";
import {SectionEntity} from "@/src/modules/section/infra/types/section.entity";
import {Toggle} from "@/src/lib/di/interface/toggle-popup";

export class SectionsStore {
  private static instance: SectionsStore

  static getInstance(): SectionsStore {
    if (!SectionsStore.instance) {
      SectionsStore.instance = new SectionsStore()
    }

    return SectionsStore.instance
  }

  sectionsMenu = new Toggle(false)


  sections = new DataState<SectionEntity[], string>({ isLoading: false })

  sectionDetailsId = new DataState<string | null, string>({ isLoading: false })
  sectionDetails = new DataState<SectionEntity | null, string>({ isLoading: false })

  setSections(sections: SectionEntity[]): void {
    this.sections.setData(sections)
  }

  setSectionDetails(section: SectionEntity): void {
    this.sectionDetails.setData(section)
  }
}
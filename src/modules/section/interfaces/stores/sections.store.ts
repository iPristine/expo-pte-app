import {DataState} from "@/src/lib/di/interface/data-state";
import {SectionEntity} from "@/src/modules/section/infra/types/section.entity";

export class SectionsStore {
  private static instance: SectionsStore

  static getInstance(): SectionsStore {
    if (!SectionsStore.instance) {
      SectionsStore.instance = new SectionsStore()
    }

    return SectionsStore.instance
  }


  sections = new DataState<SectionEntity[], string>({ isLoading: false })

  setSections(sections: SectionEntity[]): void {
    this.sections.setData(sections)
  }
}
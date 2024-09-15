import {DataState} from "@/src/lib/di/interface/data-state";
import {ChapterEntity} from "@/src/modules/chapter/infra/types/chapter.entity";
import {UserEntity} from "@/src/modules/user/infra/types/user.entity";
import {Toggle} from "@/src/lib/di/interface/toggle-popup";
import { UserFavoritesEntity } from "../../infra/types/favoraties.entity";

export class UserStore {
  private static instance: UserStore

  static getInstance(): UserStore {
    if (!UserStore.instance) {
      UserStore.instance = new UserStore()
    }

    return UserStore.instance
  }

  userMenuModal = new Toggle()

  user = new DataState<UserEntity, string>({ isLoading: false })

  favorates = new DataState<UserFavoritesEntity[], string>({ isLoading: false })
  setUser(user: UserEntity): void {
    this.user.setData(user)
  }

  setFavorates(favorates: UserFavoritesEntity[]): void {
    this.favorates.setData(favorates)
  }
}
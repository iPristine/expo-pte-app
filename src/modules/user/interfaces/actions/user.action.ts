import {UserStore} from "@/src/modules/user/interfaces/stores/user.store";
import {loadUserUseCase} from "@/src/modules/user/use-cases/load-user.use-case";
import {loadFavoratesUseCase} from "@/src/modules/user/use-cases/load-favorates.use-case";
import {addToFavoratesUseCase} from "@/src/modules/user/use-cases/add-to-favorates.use-case";

export class UserAction {
    private static instance: UserAction

    readonly userStore = UserStore.getInstance()


    static getInstance(): UserAction {
        if (!UserAction.instance) {
            UserAction.instance = new UserAction()
        }

        return UserAction.instance
    }

    loadUser = async () => {
        this.userStore.user.setIsLoading(true)
        const result = await loadUserUseCase()


        if (result.isErr()) {
            this.userStore.user.setError(
                result.getError().message
            )
        } else {
            this.userStore.user.setData(result.getValue())
            this.userStore.user.setError(undefined)
        }

        this.userStore.user.setIsLoading(false)
    }

    loadFavorates = async () => {
        this.userStore.favorates.setIsLoading(true)
        const result = await loadFavoratesUseCase()

        if (result.isErr()) {
            this.userStore.favorates.setError(
                result.getError().message
            )
        } else {
            this.userStore.favorates.setData(result.getValue())
            this.userStore.favorates.setError(undefined)
        }

        this.userStore.favorates.setIsLoading(false)
    }

    addToFavorates = async (chapterId: string) => {
        const result = await addToFavoratesUseCase({chapterId})

        if (result.isErr()) {
            this.userStore.favorates.setError(
                result.getError().message
            )
        } else {
            const chapters = result.getValue()
            const chapter = chapters.find(chapter => chapter.id === chapterId)

            if (!chapter) {
                throw new Error('Chapter not found')
            }

            const favorates = this.userStore.favorates.data
            this.userStore.setFavorates([...favorates || [], chapter])
        }
    }
}
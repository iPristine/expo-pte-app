import { useEffect, useState } from "react"
import { SplashScreen } from "expo-router"
import { ApiClientStore } from "@/src/modules/api/interface/stores/api-client.store"

export function useInitStores() {
    const apiClientStore = ApiClientStore.getInstance()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function initStores() {
            try {
                await Promise.all([apiClientStore.init()])
                setIsLoading(false)

                await SplashScreen.hideAsync()
            } catch (error) {
                throw new Error("Error initializing stores")
            }
        }
        initStores()
    }, [ apiClientStore])

    return { isLoading }
}

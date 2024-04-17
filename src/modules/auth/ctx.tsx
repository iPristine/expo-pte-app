import React, {useEffect, useMemo, useState} from 'react';
import {useAuthContext} from "@/src/modules/auth/use-auth-context";
import {AuthService} from "@/src/modules/auth/interfaces/services/auth.service";
import {observer} from "mobx-react-lite";

const SessionContext = React.createContext<{
    token?: string | null;
    isLoading: boolean;
}>({
    token: undefined,
    isLoading: true,
});

// This hook can be used to access the user info.
export function useSession() {
    const context = React.useContext(SessionContext);

    if (context === undefined) {
        throw new Error("useSession must be used within a SessionProvider")
    }

    return context
}

export const SessionProvider = observer((props: React.PropsWithChildren) => {
    const [isLoading, setIsLoading] = useState(true)
    const {authStore} = useAuthContext()
    console.log('SessionProvider', authStore.token.data)
    useEffect( () => {
        const loadToken = async () => {
            setIsLoading(true)
            const token = await  AuthService.loadToken()
            if (token) {
                console.log('loadToken', token)
                authStore.token.setData(token)
            }
            setIsLoading(false)
        }


        loadToken()
    }, [])

    const contextValue = useMemo(
        () => ({
            token: authStore.token.data,
            isLoading: isLoading || authStore.token.isLoading,
        }),
        [authStore.token.data, isLoading, authStore.token.isLoading]
    )

    console.log(contextValue, authStore.token.isLoading)
    return (
        <SessionContext.Provider
            value={contextValue}>
            {props.children}
        </SessionContext.Provider>
    );
})

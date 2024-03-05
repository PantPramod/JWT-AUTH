import {  ReactNode,  createContext, useMemo, useState } from "react"

type authContextType = {
    token: string,
    saveToken: (arg0: string) => void,
    removeToken: () => void,
    refreshToken: string,
    saveRefreshToken: (arg0: string) => void
}

export const AuthContext = createContext<authContextType>({
    token: "",
    saveToken: () => { },
    removeToken: () => { },
    refreshToken: '',
    saveRefreshToken: () => { }

})

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState(localStorage.getItem('token') ?? "")
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken') ?? "")

    const saveToken = (val: string) => {
        setToken(val)
        localStorage.setItem('token', val)
    }

    const removeToken = () => {
        setToken('')
        localStorage.removeItem('token')
    }

    const saveRefreshToken = (val: string) => {
        setRefreshToken(val)
        localStorage.setItem('refreshToken', val)
    }
    const value = useMemo(() => (
        {
            token,
            saveToken,
            removeToken,
            refreshToken,
            saveRefreshToken
        }
    ), [token, refreshToken])

    return (
        <>
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        </>
    )
}

export default AuthProvider


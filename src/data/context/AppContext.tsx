import { createContext, useEffect, useState } from "react";

interface AppContextProps{
    theme?: string
    switchTheme?: () => void
}

const AppContext = createContext<AppContextProps>({
});

export function AppProvider(props) {
    
    const[theme, setTheme] = useState<string>('')

    function switchTheme() {
        const newTheme = theme === '' ? 'dark' : ''
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
    }

    useEffect(() => {
        const theme = localStorage.getItem('theme')
        setTheme(theme)
    }, [])

    return (
        <AppContext.Provider value={{
            theme,
            switchTheme
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContext;
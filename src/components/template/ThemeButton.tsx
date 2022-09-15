import { MoonIcon, SunIcon } from "../icons/index"

interface ThemeButtonProps {
    theme: string,
    switchTheme: () => void
}

export default function(props: ThemeButtonProps) {

    return props.theme === 'dark' ? (
        <div onClick={props.switchTheme} className={`
            hidden sm:flex items-center justify-end cursor-pointer
            dark:bg-zinc-200 text-zinc-800
            w-12 lg:w-18 h-6 p1 rounded-full
        `}>
            <div>
                {SunIcon()}
            </div>
        </div>
    ) : (
        <div onClick={props.switchTheme} className={`
            hidden sm:flex items-center cursor-pointer
            bg-zinc-800 text-zinc-200
            w-12 lg:w-18 h-6 p1 rounded-full
        `}>
            <div>
                {MoonIcon()}
            </div>
        </div>
    )
}
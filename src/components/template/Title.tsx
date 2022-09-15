interface TitleProps {
    title: string
    subtitle: string
}

export default function Title(props: TitleProps) {
    return(
        <div>
            <h1 className={`
                font-black text-3xl
                text-zinc-800 dark:text-zinc-200
            `}>
                {props.title}
            </h1>
            <h2 className={`
                font-light text-zinc-700 dark:text-zinc-300
            `}>
                {props.subtitle}
            </h2>
        </div>
    )
}
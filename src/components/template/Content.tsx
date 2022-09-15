interface ContentProps {
    children?:any
}

export default function Content(props: ContentProps) {
    return (
        <div className={`
            flex flex-col mt-7
            text-zinc-800 dark:text-zinc-200
        `}>
            {props.children}
        </div>
    )
}
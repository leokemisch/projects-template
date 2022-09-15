import Link from '../../../node_modules/next/link'

interface NavItemProps {
    url?: string
    text: string
    icon: any
    className?: string
    onClick?: () => void
}

export default function BarItem(props: NavItemProps) {

    function linkRender() {
        return (
            <a className={`
                    flex flex-col justify-center items-center
                    h-20 w-20 text-zinc-800 dark:text-zinc-300 ${props.className}
                `}>
                    {props.icon}
                    <span className='text-xs font-normal'>
                        {props.text}
                    </span>
                </a>
        )
    }

    return(

        <li onClick={props.onClick} className={`hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer`}>
            {props.url? (
                <Link href={props.url}>
                    {linkRender()}
                </Link>
            ) : (
                linkRender()
            )}
        </li>
    )
}
import Link from "next/link"
import useAuth from "../../data/hook/useAuth"

interface UserAvatarProps {
    className?: string
}


export default function UserAvatar(props: UserAvatarProps) {
    const {user} = useAuth()
    return (
        <Link href="/settings">
            <img src={user?.photoURL ?? '/images/profile.svg'}
                alt ="User Avatar"
                className={`
                    h-10 w-10 rounded-full cursor-pointer ml-2
                    ${props.className} 
                `}
            />
        </Link>
    )
}
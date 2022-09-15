import useAuth from "../../data/hook/useAuth";
import { HomeIcon, AdjustmentsIcon, BellIcon, ExitIcon} from "../icons/index";
import NavItem from "./NavItem";

export default function Sidebar() {

    const { logout } = useAuth()

    return (
        <aside className="bg-zinc-300 dark:bg-zinc-800 flex flex-col">
            <div className={`
                flex flex-col items-center justify-center
                h-20 w-20 text-zinc-800 dark:text-zinc-300
            `}>
                <h2>LOGO</h2>
            </div>    

            <ul className="flex-grow">
                <NavItem url='/' text='Home' icon={HomeIcon()}/>
                <NavItem url='/settings' text='Settings' icon={AdjustmentsIcon()}/>
                <NavItem url='/notifications' text='Notifications' icon={BellIcon()}/>
            </ul>
            <ul>
                <NavItem 
                    onClick={logout} 
                    text='Logout' 
                    icon={ExitIcon()} 
                />
            </ul>
        </aside>
    )
}
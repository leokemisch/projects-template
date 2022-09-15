
import useAppData from "../../data/hook/useAppData"
import forceAuth from "../../functions/ForceAuth"
import Content from "./Content"
import Header from "./Header"
import Navbar from "./Navbar"

interface LayoutProps{
    title: string
    subtitle: string
    children?: any
}

export default function Layout(props: LayoutProps) {

    const { theme } = useAppData()

    return forceAuth (
            <div className={`${theme} flex h-screen w-screen
            `}>
                <Navbar />
                <div className={`
                    flex flex-col h-full w-full p-7
                    bg-zinc-100 aspect-square dark:bg-zinc-700
                `}>
                    <Header title={props.title} subtitle={props.subtitle} />
                    <Content>
                        {props.children}
                    </Content>
                </div> 
            </div>
    )
}
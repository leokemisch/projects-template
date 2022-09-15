import Image from "next/image"
import Head from "next/head"
import Router from "next/router"
import loadingGif from '../../../public/images/loading.gif'
import useAuth from "../../data/hook/useAuth"
import Script from "next/script"

export default function ForceAuth(props) {

    const {user, loading} = useAuth()

    function renderContent() {
        return(
            <>
                <Head>
                    <Script
                        dangerouslySetInnerHTML={{
                            __html: `
                                if(!document.cookie?.includes("template-auth")) {
                                    window.location.href = "/authentication"
                                }
                            `
                        }}
                    />
                </Head>
                {props.children}
            </>
        )
    }

    function renderLoading() {
        return(
            <div className={`
                flex justify-center items-center h-screen
            `}>
                <Image src={loadingGif}></Image>
            </div>
        )
    }

    if(!loading && user?.email) {
        return renderContent()
    } else if(loading) {
        renderLoading()
    } else {
        Router.push('/authentication')
        return null
    }

}
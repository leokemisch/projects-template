import { createContext, useEffect, useState } from "react";
import Router from "next/router";
import firebase from "../../firebase/config";
import User from "../../model/User";
import Cookies from "js-cookie";

interface AuthContextProps {
    user?: User
    loading?: Boolean
    login?: (email: string, password: string) => Promise<void>
    register?: (email: string, password: string) => Promise<void>
    loginGoogle?: () => Promise<void>
    logout?: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({})

async function normalUser(firebaseUser: firebase.User) : Promise<User> {

    const token = await firebaseUser.getIdToken()

    return {
        uid: firebaseUser.uid,
        name: firebaseUser.displayName,
        email: firebaseUser.email,
        token,
        provider: firebaseUser.providerData[0].providerId,
        photoURL: firebaseUser.photoURL
    }
}

function CookieManage(online: any) {
    if(online == 'online') {
        Cookies.set('template-auth', 'online', { expires: 7 })
    } else {
        Cookies.remove('template-auth')
    }
}

export function AuthProvider(props) {

    const [user, setUser] = useState<User>(null)
    const [loading, setLoading] = useState<Boolean>(true)

    async function sessionConfig(firebaseUser) {
        if(firebaseUser?.email) {
            const user = await normalUser(firebaseUser)
            setUser(user)
            CookieManage('online')
            setLoading(false)
            return user.email
        } else {
            setUser(null)
            CookieManage('Offline')
            setLoading(false)
            return false
        }
    }

    async function register(email: string, password: string) {
        try{
            setLoading(true)
            const response = await firebase.auth().createUserWithEmailAndPassword(email, password)
            await sessionConfig(response.user) 
            Router.push('/')
        } finally {
            setLoading(false)
        }        
    }

    async function login(email: string, password: string) {
        try{
            setLoading(true)
            const response = await firebase.auth().signInWithEmailAndPassword(email, password)
            await sessionConfig(response.user) 
            Router.push('/')
        } finally {
            setLoading(false)
        }        
    }

   async function loginGoogle() {
        try{
            setLoading(true)
            const response = await firebase.auth().signInWithPopup(
                new firebase.auth.GoogleAuthProvider()
            )
            await sessionConfig(response.user) 
            Router.push('/')
        } finally {
            setLoading(false)
        }        
   }

   async function logout() {
        try {
            setLoading(true)
            await firebase.auth().signOut()
            await sessionConfig(null)
        } finally {
            setLoading(false)
        } 
   }

   useEffect(() => {

        if(Cookies.get('template-auth') == 'online') {
            const cancel = firebase.auth().onIdTokenChanged(sessionConfig)
            return () => cancel()
        } else {
            setLoading(false)
        }
   }, [])

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            register,
            login,
            loginGoogle,
            logout
        }}>
            {props.children}    
         </AuthContext.Provider>
    )
}

export default AuthContext


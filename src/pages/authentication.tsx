import { useState } from "react";
import AuthInput from "../components/authentication/AuthInput";
import { WarningIcon } from "../components/icons/index";
import useAuth from "../data/hook/useAuth";

export default function Authentication() {

    const {register, login, loginGoogle} = useAuth()

    const [error, setError] = useState(null)
    const [mode, setMode] = useState<'login' | 'registration'>('login')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function showError(msg, time = 8000) {
        setError(msg)
        setTimeout(() => setError(null), time)
    }

    async function submit() {
        try {
            if(mode === 'login') {
                await login(email, password)
            } else {
                await register(email, password)
            }
        } catch(e) {
            showError(e?.message ?? 'login error')
        }
    }

    return (
        <div className={`
            bg-zinc-800 w-screen h-screen
            flex flex-col justify-center items-center
        `}>
            <div className={`
                bg-zinc-200 rounded-xl p-8
                flex flex-col justify-around align-middle 
                sm:w-2-3 md:w-1/2 lg:w-3/12
                `}>
                <h1 className={`
                    text-2xl font-bold mb-4
                `}>
                    {mode === 'login' ? 'Enter your account' : 'Register'}
                </h1>

                {
                    error ? (
                    <div className={`
                        bg-red-400 text-white py-3 px-5 my-2 mx-2 rounded-lg
                        flex items-center justify-center
                    `}>
                        <span className="ml-2">
                            {error}
                        </span>
                    </div>
                    ) : false 
                }
                
                <AuthInput 
                    label='Email'
                    value={email}
                    type='email'
                    changeValue={setEmail}
                    required
                />
                <AuthInput 
                    label='Password'
                    value={password}
                    type='password'
                    changeValue={setPassword}
                    required
                />

                <button onClick={submit} className={`
                    bg-zinc-800 hover:bg-zinc-700 text-white 
                    rounded-lg px-4 py-2 mt-4
                `}>
                    {mode === 'login' ? 'Login' : 'Register'}
                </button>
                <button onClick={loginGoogle} className={`
                    bg-blue-500 hover:bg-blue-700 text-white 
                    rounded-lg px-4 py-2 mt-2
                `}>
                    Login Whith Google
                </button>

                {
                    mode ==='login' ? (
                        <p className= {`mt-8`}>
                            New around here? 
                            <a onClick={() => setMode('registration')} className={`
                                text-blue-600 hover:text-blue-800 font-semibold cursor-pointer ml-2
                            `}>
                            Create your account
                            </a>
                        </p>
                    ) : (
                        <p className= {`mt-8`}>
                            Already have an account?
                            <a onClick={() => setMode('login')} className={`
                             text-blue-600 hover:text-blue-800 font-semibold cursor-pointer ml-2
                            `}>
                            Log in
                            </a>
                        </p>
                    )
                }
                
            </div>
        </div>
    )
}
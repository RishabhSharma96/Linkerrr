'use client'

import { signIn } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const HeroForm = ({ user_name }) => {

    const [username, setUsername] = useState("")
    const router = useRouter()

    useEffect(() => {
        if ('localStorage' in window && window.localStorage.getItem("linkerrrUsername")) {
            const user = window.localStorage.getItem("linkerrrUsername")
            window.localStorage.removeItem("linkerrrUsername")
            redirect(`/account?username=${user}`)
        }
    }, [])

    const handleCreateAccount = async (e) => {
        e.preventDefault()
        if (username.length > 0) {
            if (user_name) {
                router.push(`/account?username=${username}`)
            }
            else {
                window.localStorage.setItem("linkerrrUsername", username)
                await signIn('google')
            }
        }
        else {
            console.log("it is empty")
        }
    }

    return (
        <form className="w-[80%]">
            <span className="pl-3 pt-[1.1rem] pb-[1.1rem] bg-white text-lg text-purple-900 rounded-l-lg font-bold">linkerrr.to/
            </span>
            <input
                type="text"
                placeholder="linkerrrID"
                className="h-[3.5rem] outline-none text-lg text-gray-400 w-[200px]"
                onChange={e => setUsername(e.target.value)}
            />
            <button type="submit" onClick={handleCreateAccount} className="h-[3.5rem] bg-purple-700 text-white font-bold w-[12rem] text-lg rounded-r-lg hover:bg-white hover:text-purple-700 : hover:border-purple-700 hover:border-2 transition-all">Get Started</button>
        </form>
    )
}

export default HeroForm
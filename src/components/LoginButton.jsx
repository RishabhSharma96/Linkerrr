'use client'

import { signIn } from 'next-auth/react'
import { redirect } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

const LoginButton = () => {
    return (
        <div>

            <button

                onClick={() => {signIn('google')
                toast.success("Login Successful") }}
                className="bg-white h-[3.5rem] w-[240px] mt-5 rounded-lg text-blue-900 font-bold flex items-center justify-center gap-2 border-2 border-purple-200">
                <span>
                    <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" /></svg>
                </span>
                <div>
                    <span className="text-green-500">Sign </span>
                    <span className="text-blue-500">In </span>
                    <span className="text-yellow-500">With </span>
                    <span className="text-red-500">Google </span>
                </div>
            </button>

        </div>
    )
}

export default LoginButton
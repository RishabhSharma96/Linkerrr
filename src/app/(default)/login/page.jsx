import Image from 'next/image'
import React from 'react'
import { signIn } from "next-auth/react"
import LoginButton from '@/components/LoginButton'
import { getServerSession } from 'next-auth'
import { Loginoptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

const LoginPage = () => {

    // const session = getServerSession(Loginoptions)

    // if (session) {
    //     return redirect('/account')
    // }

    return (
        <div className="h-[91vh] w-full bg-gray-200 flex items-center justify-center">

            <div className="hidden md:flex justify-center items-center w-[40%] pl-12">
                <Image
                    src={'/images/LinkerrrLoginSider.png'}
                    height={1300}
                    width={1300}
                    alt="login-form-asset"
                />
            </div>

            <div
                className="flex flex-col items-center justify-center gap-2 w-[90%] md:w-[60%]">
                <div className='mix-blend-multiply'>
                    <Image src="/images/LinkerrrLogo.png" width={250} height={250} alt="Company logo" />
                </div>
                <span className="text-purple-700 font-bold text-lg flex justify-center items-center text-center">Linkerrr works seemingly fast with Google Accounts</span>
                <LoginButton />
            </div>
        </div >
    )
}

export default LoginPage
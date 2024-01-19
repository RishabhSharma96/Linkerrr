import Image from 'next/image'
import React from 'react'
import {signIn} from "next-auth/react"
import LoginButton from '@/components/LoginButton'

const LoginPage = () => {
    return (
        <div className="h-[91vh] w-full bg-gray-200 flex items-center justify-center">

            <div className="flex justify-center items-center w-[40%] pl-12">
                <Image
                    src={'/images/LinkerrrLoginSider.png'}
                    height={1300}
                    width={1300}
                    alt="login-form-asset"
                />
            </div>

            <div
                className="flex flex-col items-center justify-center gap-2 w-[60%]">
                <div className='mix-blend-multiply'>
                    <Image src="/images/LinkerrrLogo.png" width={250} height={250} alt="Company logo" />
                </div>
                <span className="text-purple-700 font-bold text-lg flex justify-center items-center">Linkerrr works seemingly fast with Google Accounts</span>
                <LoginButton/>
            </div>
        </div >
    )
}

export default LoginPage
'use client'

import { signOut } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import toast from 'react-hot-toast'

const LogoutButton = () => {
    return (
        <div>
            <button onClick={() => {signOut()
            toast.success('User Logged out!')}} className='bg-purple-700 font-bold text-white rounded-md text-lg h-[2.5rem] w-[9rem] shadow-2xl'>Logout</button>
        </div>
    )
}

export default LogoutButton
"use client"

import GrabUsername from '@/actions/GrabUsername'
import { redirect } from 'next/navigation'
import React, { useState } from 'react'

const UsernameForm = ({user_name}) => {

    const [isUsernameTaken , setIsUsernameTaken] = useState(false)

    const HandleSubmit = async (formData) => {
        const result = await GrabUsername(formData)
        if(result === false){
            setIsUsernameTaken(true)
        }
        else{
            setIsUsernameTaken(false)
            redirect(`/account?created=${formData.get("username")}`)
        }
    }

    return (
        <form action={HandleSubmit} className="w-[80%]">
            <span className="pl-3 pt-[1.1rem] pb-[1.1rem] bg-white text-lg text-purple-900 rounded-l-lg font-bold">linkerrr.to/
            </span>
            <input
                name='username'
                type="text"
                placeholder="linkerrr Username"
                className="h-[3.5rem] outline-none text-lg text-purple-900 w-[200px] font-bold"
                defaultValue={user_name}
            />
            <button type="submit" className="h-[3.5rem] bg-purple-700 text-white font-bold w-[12rem] text-lg rounded-r-lg hover:bg-white hover:text-purple-700 : hover:border-purple-700 hover:border-2 transition-all mb-2">Claim my linkerrr</button><br />
            {isUsernameTaken && <span className='text-red-600'>This username is aldready taken*</span>}
        </form>
    )
}

export default UsernameForm
'use client'

import React from 'react'
import RadioButtons from './RadioButtons'
import Image from 'next/image'
import UpdateUserDetails from '@/actions/UpdateUserDetails'

const AccountTopper = ({ page, session }) => {

    const saveUserDatails = async (formData) => {
        const username = formData.get('username')
        const userlocation = formData.get('location')
        const userbio = formData.get('bio')

        await UpdateUserDetails(username, userlocation, userbio)
    }

    return (
        <div className=''>

            <form action={saveUserDatails} className='p-4 bg-gray-200'>
                <div className='w-full h-[16rem] bg-gray-400 p-3'>
                    <RadioButtons
                        options={[
                            { value: "Color", label: "Color" },
                            { value: "Image", label: "Image" }
                        ]}
                        onChange={() => { }}
                    />
                </div>
                <div className='flex justify-center'>
                    <Image className='rounded-full relative -top-20 overflow-hidden border-4' src={session?.user?.image} height={150} width={150} alt='profileimage' />
                </div>
                <div className='flex flex-col bg-gray-200 p-4 mt-[-7rem] gap-3'>
                    <div className='flex flex-wrap gap-3'>
                        <span className='font-bold text-purple-800'>DISPLAY NAME</span>
                        <input
                            className='w-[100%] h-[3rem] focus:outline-none text-xl pl-4 text-gray-500 font-semibold placeholder:italic placeholder:font-normal rounded-lg'
                            type="text"
                            placeholder="eg. John Doe"
                            name='username'
                            defaultValue={page.name}
                        />
                        <span className='font-bold text-purple-800'>LOCATION</span>
                        <input
                            className='w-[100%] h-[3rem] focus:outline-none text-xl pl-4 text-gray-500 font-semibold placeholder:italic placeholder:font-normal rounded-lg'
                            type="text"
                            placeholder="eg. Seattle, New York"
                            defaultValue={page.location}
                            name='location'
                        />
                    </div>
                    <span className='font-bold text-purple-800 '>BIO</span>
                    <input
                        className='w-[100%] h-[3rem] focus:outline-none text-xl pl-4 text-gray-500 font-semibold placeholder:italic placeholder:font-normal rounded-lg'
                        type="text"
                        placeholder="My Hobbies include ..."
                        defaultValue={page.bio}
                        name="bio"
                    />
                    <div className='w-full flex justify-end mt-2'>
                        <button className='rounded-md '><span className='flex bg-purple-700 text-white font-bold p-3 gap-2 rounded-lg'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                            </svg>

                            Update Details</span></button>
                    </div>
                </div>
            </form>




        </div>
    )
}

export default AccountTopper
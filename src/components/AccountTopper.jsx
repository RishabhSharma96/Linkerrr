'use client'

import React, { useState } from 'react'
import RadioButtons from './RadioButtons'
import Image from 'next/image'
import UpdateUserDetails from '@/actions/UpdateUserDetails'
import axios from 'axios'

const AccountTopper = ({ page, session }) => {

    const [bgType, setBgType] = useState(page.bgType)
    const [bgColor, setBgColor] = useState(page.bgColor)
    const [imageURL, setImageUrl] = useState(page.bgImageUrl)
    const [avatar, setAvatar] = useState(session?.user?.image)

    const saveUserDatails = async (formData) => {
        const username = formData.get('username')
        const userlocation = formData.get('location')
        const userbio = formData.get('bio')
        const userbgType = bgType
        const usercolor = bgColor

        await UpdateUserDetails(username, userlocation, userbio, userbgType, usercolor, imageURL, avatar)
    }

    const HandleFileUpload = async (e) => {

        const files = e.target.files;
        const formData = new FormData();

        for (const file of files) {
            formData.append("file", file);
            formData.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET)
        }

        const data = await axios.post(process.env.NEXT_PUBLIC_CLOUDINARY_URL,
            formData
        ).then((response) => {
            setImageUrl(response?.data?.secure_url)
        }).catch((error) => {
            console.error("Error: ", error);
        })
    }

    const handleAvatarUpload = async (e) => {

        const files = e.target.files;
        const formData = new FormData();

        for (const file of files) {
            formData.append("file", file);
            formData.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET)
        }

        const data = await axios.post(process.env.NEXT_PUBLIC_CLOUDINARY_URL,
            formData
        ).then((response) => {
            setAvatar(response?.data?.secure_url)
        }).catch((error) => {
            console.error("Error: ", error);
        })
    }

    return (
        <div className='bg-gray-200'>

            <form action={saveUserDatails} className='bg-white '>
                <div className={'w-full h-[16rem] p-3 bg-cover bg-center'} style={
                    bgType === 'Color' ? { backgroundColor: bgColor } : { backgroundImage: `url(${imageURL})` }
                }>
                    <RadioButtons
                        defaultValue={bgType}
                        onChange={val => setBgType(val)}
                        options={[
                            { value: "Color", label: "Color" },
                            { value: "Image", label: "Image" }
                        ]}
                    />
                    {bgType === 'Color' && <div className='flex items-center mt-2'>
                        <input type="color" className='w-[8.9rem]' name="userbgcolor" onChange={e => setBgColor(e.target.value)} defaultValue={bgColor} />
                    </div>}
                    {bgType === 'Image' && <div className='flex items-center mt-2'>
                        <label className='w-[8.9rem] bg-white h-[1.5rem] flex justify-center font-bold text-purple-900 cursor-pointer'>Upload Image
                            <input type="file" className='hidden' onChange={HandleFileUpload} />
                        </label>
                    </div>}
                </div>
                <div className='flex justify-center'>
                    <Image className='rounded-full relative -top-20 overflow-hidden border-4 aspect-square bg-cover' src={avatar} height={150} width={150} alt='profileimage' />
                    <label className='border-2 shadow border-purple-800 rounded-full aspect-square h-[2.5rem] flex justify-center items-center relative -bottom-4 -left-8 bg-white'>
                        <input type='file' name='avatar' className='hidden' onChange={handleAvatarUpload} />
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                    </label>
                </div>
                <div className='flex flex-col bg-white p-4 mt-[-7rem] gap-3'>
                    <div className='flex flex-wrap gap-3'>
                        <span className='font-bold text-purple-800'>DISPLAY NAME</span>
                        <input
                            className='w-[100%] h-[3rem] focus:outline-none text-xl pl-4 text-gray-500 font-semibold placeholder:italic placeholder:font-normal rounded-lg bg-gray-100 border-2 border-purple-200'
                            type="text"
                            placeholder="eg. John Doe"
                            name='username'
                            defaultValue={page.name}
                        />
                        <span className='font-bold text-purple-800'>LOCATION</span>
                        <input
                            className='w-[100%] h-[3rem] focus:outline-none text-xl pl-4 text-gray-500 font-semibold placeholder:italic placeholder:font-normal rounded-lg bg-gray-100 border-2 border-purple-200'
                            type="text"
                            placeholder="eg. Seattle, New York"
                            defaultValue={page.location}
                            name='location'
                        />
                    </div>
                    <span className='font-bold text-purple-800 '>BIO</span>
                    <input
                        className='w-[100%] h-[3rem] focus:outline-none text-xl pl-4 text-gray-500 font-semibold placeholder:italic placeholder:font-normal rounded-lg bg-gray-100 border-2 border-purple-200'
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
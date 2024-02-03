'use client'

import updateExtraLinks from '@/actions/UpdateExtraLinks';
import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { ReactSortable } from 'react-sortablejs';

const ExtraLinks = ({ page, session }) => {

    const [links, setLinks] = useState(page.links || []);

    const addNewLink = () => {
        setLinks(prevLinks => {
            return [...prevLinks, {
                key: Date.now(),
                title: "",
                subtitle: "",
                url: "",
                linkImage: ""
            }]
        })
    }

    const saveUserLinks = async () => {
        await updateExtraLinks(links)
        toast.success('Links Updated!')
    }

    const handlefileUpload = async (e, linkKey) => {
        const files = e.target.files;
        const formData = new FormData();

        for (const file of files) {
            formData.append("file", file);
            formData.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET)
        }

        const data = await axios.post(process.env.NEXT_PUBLIC_CLOUDINARY_URL,
            formData
        ).then((response) => {
            setLinks(prevLinks => {
                const newLinks = [...prevLinks]
                newLinks.forEach((link, index) => {
                    if (link.key === linkKey) {
                        link.linkImage = response?.data?.secure_url
                    }
                })
                return newLinks
            })
        }).catch((error) => {
            console.error("Error: ", error);
        })
    }

    const HandleTitleChange = (e, linkKey) => {
        setLinks(prevLinks => {
            const newLinks = [...prevLinks]
            newLinks.forEach((link, index) => {
                if (link.key === linkKey) {
                    link.title = e.target.value
                }
            })
            return newLinks
        })
    }

    const HandleSubTitleChange = (e, linkKey) => {
        setLinks(prevLinks => {
            const newLinks = [...prevLinks]
            newLinks.forEach((link, index) => {
                if (link.key === linkKey) {
                    link.subtitle = e.target.value
                }
            })
            return newLinks
        })
    }

    const HandleUrlChange = (e, linkKey) => {
        setLinks(prevLinks => {
            const newLinks = [...prevLinks]
            newLinks.forEach((link, index) => {
                if (link.key === linkKey) {
                    link.url = e.target.value
                }
            })
            return newLinks
        })
    }

    const handleLinkRemoval = (linkKey) => {
        setLinks(prevLinks => {
            return [...prevLinks].filter(l => l.key !== linkKey)
        })
    }

    return (
        <div className='bg-white mt-5 p-4 pt-7 pb-7 flex flex-col'>
            <div className='flex justify-between'>
                <span className='font-bold uppercase text-purple-800 text-2xl m-3'>Add Links</span>
                <div className='flex justify-center items-center'>
                    <button onClick={addNewLink} className='rounded-md'><span className='flex bg-purple-700 text-white font-bold p-3 gap-2 rounded-lg w-[130px]'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add Link</span></button>
                </div>
            </div>

            {links.length > 0 &&
                <div className='p-4'>
                    <ReactSortable list={links} setList={setLinks} handle=".handle">
                        {links.map(link => {
                            return (
                                <div key={link.key} className='mb-[2rem] mt-[1rem] flex gap-5'>
                                    <div className='flex items-center justify-center flex-col gap-2 handle'>
                                        <div>
                                            <Image src={link?.linkImage || "/images/link.png"} height={100} width={100} alt="link-temp" />
                                        </div>
                                        <div className='flex gap-3'>
                                            <label className='flex items-center justify-center bg-purple-700 text-white p-2 gap-2 rounded-lg cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                                            </svg>
                                                <input type="file" className='hidden' onChange={(e) => handlefileUpload(e, link.key)} />
                                            </label>
                                            <button onClick={() => handleLinkRemoval(link.key)} className='flex items-center justify-center bg-purple-700 text-white p-2 gap-2 rounded-lg'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-2 w-[100%]'>
                                        <input
                                            type="text"
                                            placeholder='Title'
                                            className='w-full h-[3rem] focus:outline-none text-xl pl-4 text-gray-500 font-semibold placeholder:italic placeholder:font-normal  bg-gray-100 border-2 border-purple-200'
                                            onChange={(e) => HandleTitleChange(e, link.key)}
                                            defaultValue={link.title}
                                        />
                                        <input
                                            type="text"
                                            placeholder='Sub-tite (optional)'
                                            className='w-[100%] h-[3rem] focus:outline-none text-xl pl-4 text-gray-500 font-semibold placeholder:italic placeholder:font-normal  bg-gray-100 border-2 border-purple-200'
                                            onChange={(e) => HandleSubTitleChange(e, link.key)}
                                            defaultValue={link.subtitle}
                                        />
                                        <input
                                            type="text"
                                            placeholder='url'
                                            className='w-[100%] h-[3rem] focus:outline-none text-xl pl-4 text-gray-500 font-semibold placeholder:italic placeholder:font-normal  bg-gray-100 border-2 border-purple-200'
                                            onChange={(e) => HandleUrlChange(e, link.key)}
                                            defaultValue={link.url}
                                        />
                                    </div>
                                </div>
                            )
                        })}
                    </ReactSortable>
                </div>}
            {links.length > 0 && <span className='text-green-600 w-full flex justify-end mt-[-40px] pr-4'>Press and Hold to reorder items</span>}

            {links.length > 0 && <div className='w-full flex justify-end mt-3'>
                <button onClick={saveUserLinks} className='rounded-md '><span className='flex bg-purple-700 text-white font-bold p-3 gap-2 rounded-lg'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                    </svg>

                    Save Links</span></button>
            </div>}

        </div>
    )
}

export default ExtraLinks
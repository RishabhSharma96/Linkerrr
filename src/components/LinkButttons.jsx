'use client'

import UpdateUserLinks from '@/actions/UpdateUserLinks';
import { faDiscord, faFacebook, faGithub, faInstagram, faTelegram, faTiktok, faWhatsapp, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faGripLines, faMinus, faMobile, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { ReactSortable } from 'react-sortablejs';

const allButtons = [
    { key: 'email', 'label': 'E-mail', icon: faEnvelope, placeholder: "example@xyz.com" },
    { key: 'mobile', 'label': 'Mobile', icon: faMobile, placeholder: "+00 1234567890" },
    { key: 'instagram', 'label': 'Instagram', icon: faInstagram, placeholder: "https://instagram.com/profile/..." },
    { key: 'facebook', 'label': 'Facebook', icon: faFacebook, placeholder: "https://facebook.com/profile/..." },
    { key: 'discord', 'label': 'Discord', icon: faDiscord, placeholder: "https://discord.com/@..." },
    { key: 'tiktok', 'label': 'Tiktok', icon: faTiktok, placeholder: "https://tiktok.com/profile/..." },
    { key: 'youtube', 'label': 'Youtube', icon: faYoutube, placeholder: "https://youtube.com/channel/..." },
    { key: 'whatsapp', 'label': 'Whatsapp', icon: faWhatsapp, placeholder: "https://wa.me/profile/..." },
    { key: 'github', 'label': 'Github', icon: faGithub, placeholder: "https://github.com/..." },
    { key: 'telegram', 'label': 'Telegram', icon: faTelegram, placeholder: "https://t.me/@/..." },
];


const LinkButttons = ({ page, session }) => {

    const pageButtonKeys = Object.keys(page.buttons || {})
    const pageButtonValues = pageButtonKeys.map(l => allButtons.find(b => b.label === l))

    const [addedButton, setAddedButton] = useState(pageButtonValues)

    const addButtonToProfile = (button) => {
        setAddedButton(prevButtons => {
            return [...prevButtons, button]
        })
    }

    const avalaibleButtons = allButtons.filter(b1 => !addedButton.find(b2 => b2.key === b1.key))

    const UpdateLinkButtons = async (formData) => {
        await UpdateUserLinks(formData)
        toast.success('User Buttons Updated!')
    }

    const removeButton = (btn) => {
        setAddedButton(prevButtons => {
            return prevButtons.filter(button => button.key !== btn.key)
        })
    }

    return (
        <form action={UpdateLinkButtons} className='bg-white mt-5 p-4 pt-7 pb-7'>
            <span className='font-bold uppercase text-purple-800 text-2xl m-3'>Add Contact Details</span>

            {addedButton.length > 0 &&
                <div className='flex flex-col mt-2'>
                    <ReactSortable list={addedButton} setList={setAddedButton} handle=".handle">
                        {addedButton.map(btn => {
                            return (
                                <div key={btn.key} className='flex m-2 h-[3rem]'>
                                    <span onClick={() => removeButton(btn)} className='bg-red-600 flex items-center justify-center pr-2 pl-2 text-gray-200 cursor-pointer '><FontAwesomeIcon className='h-5 w-5' icon={faMinus} /></span>
                                    <span className='flex gap-1 w-[140px] items-center pl-2 bg-purple-400 font-bold text-gray-900 handle'><FontAwesomeIcon key={btn?.key} className='h-5 w-5' icon={btn?.icon} />
                                        {btn?.label}</span>
                                    <input name={btn.label} className="border-2 border-purple-200 w-full focus:outline-none pl-4 font-bold text-xl text-gray-600 placeholder:italic placeholder:font-normal bg-gray-100" type="text" placeholder={btn.placeholder} defaultValue={page.buttons ? page.buttons[btn.label] : ""} />
                                </div>
                            )
                        })}
                    </ReactSortable>
                </div>
            }

            {addedButton.length > 0 && <span className='text-green-600 w-full flex justify-end pr-3'>Press and Hold to reorder items</span>}
            {addedButton.length > 0 && <hr className='mt-2 bg-purple-200 h-[2px] mb-[-7px]' />}

            {avalaibleButtons.length > 0 && <div className='flex flex-wrap gap-3 mt-4 p-2'>
                {avalaibleButtons.map(btn => {
                    return (
                        <div onClick={() => addButtonToProfile(btn)} key={btn.key} className='flex items-center justify-center w-[9rem] h-[2.3rem] cursor-pointer bg-gray-300 gap-2 rounded-md'>
                            <FontAwesomeIcon className='h-5 w-5' icon={btn.icon} />
                            <span>{btn.label}</span>
                            <FontAwesomeIcon className='h-4 w-4 font-normal' icon={faPlus} />
                        </div>
                    )
                })}
            </div>}

            {addedButton.length > 0 && <hr className='mt-2 bg-purple-200 h-[1px]' />}

            {addedButton.length > 0 && <div className='w-full flex justify-end mt-3'>
                <button type='submit' className='rounded-md '><span className='flex bg-purple-700 text-white font-bold p-3 gap-2 rounded-lg'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                    </svg>

                    Save Prefferrences</span></button>
            </div>}
        </form>
    )
}

export default LinkButttons
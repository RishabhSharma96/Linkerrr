import { Page } from '@/models/Page'
import { User } from '@/models/User'
import { Event } from '@/models/Event'
import { faDiscord, faFacebook, faGithub, faInstagram, faTelegram, faTiktok, faWhatsapp, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faMobile } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import mongoose from 'mongoose'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const allButtonsIcons = {
    "E-mail": faEnvelope,
    "Mobile": faMobile,
    'Instagram': faInstagram,
    'Facebook': faFacebook,
    'Discord': faDiscord,
    'Tiktok': faTiktok,
    'Youtube': faYoutube,
    'Whatsapp': faWhatsapp,
    'Github': faGithub,
    'Telegram': faTelegram,
};

const UserPage = async ({ params }) => {

    const uri = params?.uri
    mongoose.connect(process.env.MONGODB_URI)
    const UserPage = await Page.findOne({ uri: uri })
    const UserDetails = await User.findOne({ email: UserPage.owner })

    await Event.create({
        uri: uri,
        eventType: "view",
        page: uri
    })

    const redirectLink = (key, val) => {
        if (key === 'mobile') {
            return 'tel:' + val
        }
        if (key === 'E-mail') {
            return 'mailto:' + val
        }
        return val
    }

    const linkImageofNull = "https://res.cloudinary.com/digqsa0hu/image/upload/v1706615993/uso46azzr1mp9offkog6.png"

    return (
        <div className='bg-gray-200 h-[100vh]'>
            <div>
                <div className='w-full h-[14rem] p-3 bg-cover bg-center bg-gray-500' style={
                    (UserPage.bgType === 'Color') ? { backgroundColor: UserPage.bgColor } : { backgroundImage: `url(${UserPage.bgImageUrl})` }
                }>
                </div>
                <div className='flex justify-center'>
                    <Image className='rounded-full relative -top-20 overflow-hidden border-4 aspect-square bg-cover' src={UserDetails.image} height={160} width={160} alt='profileimage' />
                </div>
                <div className='mt-[-10rem] bg-gray-300 pt-16'>
                    <div className=' flex flex-col justify-center items-center gap-2 p-[2rem]'>
                        <span className='text-purple-700 font-bold text-3xl justify-center items-center text-center'>{UserPage.name}</span>
                        <span className=' text-purple-500 font-bold text-xl flex gap-2 text-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                            </svg>
                            {UserPage.location}</span>
                        <span className=' text-purple-700 font-bold text-xl text-center'>{UserPage.bio}</span>
                        <div className='flex gap-2 mt-2 flex-wrap'>
                            {Object.keys(UserPage.buttons).map(key => (
                                <div key={key} className='border-2 border-purple-400 p-2 rounded-full'>
                                    <Link
                                        href={redirectLink(key, UserPage.buttons[key])}>
                                        <FontAwesomeIcon className='h-6 w-6 text-gray-800' icon={allButtonsIcons[key]} />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='flex flex-wrap items-center justify-center p-4 gap-3 bg-gray-200'>
                    {UserPage.links.map(link => {
                        return (
                            <div key={link.key} className='flex bg-slate-300 p-2 h-[6rem] w-[310px]'>
                                {/* {JSON.stringify(link.linkImage)} */}
                                <Link
                                    target='_blank'
                                    ping={`/api/click?url=${btoa(link.url)}&page=${uri}`}
                                    className='flex' href={link.url}>
                                    <div className='h-[5rem] w-[7rem] bg-cover bg-center' style={link.url !== "" ? { backgroundImage: `url(${link.linkImage})` } : { backgroundImage: `url(${linkImageofNull})` }}></div>
                                    <div className='flex flex-col w-[11.5rem] items-center justify-center'>
                                        <span className='font-extrabold text-lg text-purple-800 ml-3'>{link.title.slice(0, 15)}{link.title.length > 15 ? "..." : ''}</span>
                                        <span className='font-bold text-purple-800 ml-3 break-words flex text-center'>{link.subtitle.slice(0, 30)}{link.subtitle.length > 30 ? "..." : ''}</span>
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default UserPage
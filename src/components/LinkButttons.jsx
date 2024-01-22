import { faDiscord, faFacebook, faGithub, faInstagram, faTelegram, faTiktok, faWhatsapp, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faMobile, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const allButtons = [
    { key: 'email', 'label': 'E-mail', icon: faEnvelope },
    { key: 'mobile', 'label': 'Mobile', icon: faMobile },
    { key: 'instagram', 'label': 'Instagram', icon: faInstagram },
    { key: 'facebook', 'label': 'Facebook', icon: faFacebook },
    { key: 'discord', 'label': 'Discord', icon: faDiscord },
    { key: 'tiktok', 'label': 'Tiktok', icon: faTiktok },
    { key: 'youtube', 'label': 'Youtube', icon: faYoutube },
    { key: 'whatsapp', 'label': 'Whatsapp', icon: faWhatsapp },
    { key: 'github', 'label': 'Github', icon: faGithub },
    { key: 'telegram', 'label': 'Telegram', icon: faTelegram },
];

const LinkButttons = () => {
    return (
        <div className='bg-white mt-5 p-4 pt-7 pb-7'>
            <span className='font-bold uppercase text-purple-800 text-2xl m-3'>Add Links</span>
            <div className='flex flex-wrap gap-3 mt-4 p-2'>
                {allButtons.map(btn => {
                    return (
                        <div key={btn.key} className='flex items-center justify-center w-[9rem] h-[2.3rem] cursor-pointer bg-gray-300 gap-2 rounded-md'>
                            <FontAwesomeIcon className='h-5 w-5' icon={btn.icon} />
                            <span>{btn.label}</span>
                            <FontAwesomeIcon className='h-4 w-4 font-normal' icon={faPlus} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default LinkButttons
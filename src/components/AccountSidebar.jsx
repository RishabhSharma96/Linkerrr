"use client"

import React, { useState } from 'react'
import LogoutButton from './LogoutButton'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Page } from '@/models/Page'

const AccountSidebar = ({ image, page }) => {

    const url = usePathname()
    const [toggle, setToggle] = useState(false)

    return (
        <div className=''>
            <div className='md:hidden fixed left-0'>
                <label onClick={() => setToggle(!toggle)} className='bg-white p-3 font-bold flex gap-2 shadow border-1 border-gray-200'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </label>
            </div>
            <div className={toggle ? "flex " + " w-[15rem] bg-white h-[100vh]  flex-col items-center pt-10 gap-3 justify-between p-5 z-20 transition-all" : "hidden md:flex " + " w-[15rem] bg-white h-[100vh]  flex-col items-center pt-10 gap-3 justify-between p-5 z-20 transition-all"}>
                <div>
                    <span className="text-purple-700 font-extrabold text-4xl mb-4">My Space</span>
                    <div className="rounded-full overflow-hidden aspect-square w-36 mx-auto mt-5 p-2 border-4 border-gray-200 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
                    </div>

                    <div >
                        <Link target="_blank" href={'/' + page?.uri} className='flex gap-2 items-center justify-center mt-4'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-purple-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                            </svg>
                            <span className='text-purple-500 font-extrabold text-2xl'>/</span>
                            <span className='text-purple-500 font-bold text-xl'>{page?.uri}</span>
                        </Link>
                    </div>
                    <div className="flex flex-col gap-3 mt-8">

                        <Link href={"/account"}>
                            <span className={"flex gap-2 text-xl " + (url === "/account" ? "font-extrabold text-purple-700" : "font-bold text-gray-600")}>
                                <svg xmlns="http://www.w3.org/2000/svg" className={"h-7 w-7 " + (url === '/account' ? "text-purple-700 font-extrabold" : 'text-black font-bold')} fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                                </svg>
                                My Page
                            </span>
                        </Link>
                        <Link href={"/analytics"}>
                            <span className={"flex gap-2 text-xl " + (url === "/analytics" ? "font-extrabold text-purple-700" : "font-bold text-gray-600")}>

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={"h-7 w-7 " + (url === '/analytics' ? "text-purple-700 font-extrabold" : 'text-black font-bold')}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                                </svg>

                                Analytics
                            </span>
                        </Link>

                    </div>
                </div>

                <div className="relative bottom-0" s>
                    <LogoutButton />
                </div>
            </div>
        </div>
    )
}

export default AccountSidebar
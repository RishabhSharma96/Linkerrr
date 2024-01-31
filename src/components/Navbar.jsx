import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { Loginoptions } from '@/app/api/auth/[...nextauth]/route'
import LogoutButton from './LogoutButton'


const Navbar = async () => {

  const session = await getServerSession(Loginoptions)

  return (
    <div className='h-[9vh] pr-5 pl-5 flex items-center justify-between'>

      <div className='flex items-center'>
        <div>
          <Link href={'/'}>
            <Image
              src="/images/LinkerrrLogo.png"
              width={170}
              height={130}
              alt='Linkerrr logo'
            />
          </Link>
        </div>
      </div>

      {!session ?
        <div className='flex gap-3 '>
          <Link href={'/login'}><button className='bg-purple-700 font-bold text-white rounded-md text-lg h-[2.5rem] w-[5rem] shadow-lg'>Login</button></Link>
          <button htmlFor="usernameinput" className='bg-purple-700 font-bold text-white rounded-md text-lg h-[2.5rem] w-[10.5rem] shadow-2xl'>Create Account</button>
        </div> :
        <div className='flex gap-3 '>
          <Link href={'/account'}><button className='font-bold text-purple-700 rounded-lg text-lg h-[2.5rem] w-[10rem] shadow-md'>
            Hello, {(session?.user?.name).slice(0, 7)}{(session?.user?.name).length > 7 ? ".." : ""}
          </button></Link>
          <LogoutButton />
        </div>
      }

    </div>
  )
}

export default Navbar
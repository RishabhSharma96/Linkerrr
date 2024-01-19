import { getServerSession } from 'next-auth'
import React from 'react'
import { Loginoptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

const AccountPage = async (req) => {

    const session = await getServerSession(Loginoptions)

    if(!session){
        redirect('/')
    }

    return (
        <div>
            name : {session?.user?.name}
            Linkerrr username : {req?.searchParams?.username}
        </div>
    )
}

export default AccountPage
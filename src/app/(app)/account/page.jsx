import { getServerSession } from 'next-auth'
import React from 'react'
import { Loginoptions } from '../../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import UsernameForm from '@/forms/UsernameForm'
import { Page } from '@/models/Page'
import mongoose from 'mongoose'
import AccountTopper from '@/components/AccountTopper'
import LinkButttons from '@/components/LinkButttons'

const AccountPage = async (req) => {

    const session = await getServerSession(Loginoptions)

    if (!session) {
        return redirect('/')
    }

    mongoose.connect(process.env.MONGODB_URI)
    const pageInfoWithEmail = await Page.findOne({ owner: session?.user?.email })

    if (pageInfoWithEmail) {
        return (
            <div className='bg-gray-200 p-4'>
                <AccountTopper page={pageInfoWithEmail} session={session} />
                <LinkButttons />
            </div>
        )
    }

    return (
        <div>
            <div className="h-[91vh] w-full bg-gray-200 flex">

                <div className="flex justify-center items-center w-[60%] flex-col gap-3">
                    <p className="text-7xl w-[80%] font-extrabold text-purple-700 mb-10">Get started with Linkerrr Account.</p>
                    <p className="text-lg w-[80%] text-purple-500">Get Started with Linkerrr with this username. This will be your identity to the world.</p>
                    <UsernameForm user_name={req?.searchParams?.username} />
                </div>

                <div className="flex justify-center items-center w-[40%] pr-10">
                    <Image
                        src={'/images/LinkerrrLoginSider.png'}
                        height={1300}
                        width={1300}
                        alt="login-form-asset"
                    />
                </div>

            </div>
        </div >
    );
}

export default AccountPage
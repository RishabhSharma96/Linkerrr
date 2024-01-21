'use server'

import { Loginoptions } from "@/app/api/auth/[...nextauth]/route"
import { Page } from "@/models/Page"
import mongoose from "mongoose"
import { getServerSession } from "next-auth"

const UpdateUserDetails = async (username, userlocation, userbio) => {

    mongoose.connect(process.env.MONGODB_URI)

    const session = await getServerSession(Loginoptions)

    console.log(username)
    console.log(userlocation)
    console.log(userbio)

    if (session) {
        await Page.updateOne({
            owner: session?.user?.email
        }, {
            name: username,
            location: userlocation,
            bio: userbio
        })
        return true;
    }
    return false;
}

export default UpdateUserDetails
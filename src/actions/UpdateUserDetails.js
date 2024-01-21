'use server'

import { Loginoptions } from "@/app/api/auth/[...nextauth]/route"
import { Page } from "@/models/Page"
import mongoose from "mongoose"
import { getServerSession } from "next-auth"

const UpdateUserDetails = async (username, userlocation, userbio, userbgType, usercolor, imageURL) => {

    mongoose.connect(process.env.MONGODB_URI)

    const session = await getServerSession(Loginoptions)

    if (session) {
        await Page.updateOne({
            owner: session?.user?.email
        }, {
            name: username,
            location: userlocation,
            bio: userbio,
            bgType: userbgType,
            bgColor: usercolor,
            bgImageUrl: imageURL
        })
        return true;
    }
    return false;
}

export default UpdateUserDetails
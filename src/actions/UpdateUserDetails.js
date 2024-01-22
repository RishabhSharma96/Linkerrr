'use server'

import { Loginoptions } from "@/app/api/auth/[...nextauth]/route"
import { Page } from "@/models/Page"
import { User } from "@/models/User"
import mongoose from "mongoose"
import { getServerSession } from "next-auth"

const UpdateUserDetails = async (username, userlocation, userbio, userbgType, usercolor, imageURL, avatar) => {

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

        if (avatar.includes("cloudinary")) {
            await User.updateOne({
                email: session?.user?.email
            }, {
                image: avatar
            })
        }

        return true;
    }
    return false;
}

export default UpdateUserDetails
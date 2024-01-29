'use server'

import { Loginoptions } from "@/app/api/auth/[...nextauth]/route"
import { Page } from "@/models/Page"
import mongoose from "mongoose"
import { getServerSession } from "next-auth"

const updateExtraLinks = async (links) => {

    mongoose.connect(process.env.MONGODB_URI)

    const session = await getServerSession(Loginoptions)

    if (session) {

        await Page.updateOne({ owner: session?.user?.email }, {
            links: links
        })
        return true;
    }

    return false;
}

export default updateExtraLinks
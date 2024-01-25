'use server'

import { Loginoptions } from "@/app/api/auth/[...nextauth]/route"
import { Page } from "@/models/Page"
import mongoose from "mongoose"
import { getServerSession } from "next-auth"

const UpdateUserLinks = async (formData) => {

    mongoose.connect(process.env.MONGODB_URI)

    const session = await getServerSession(Loginoptions)

    if (session) {
        const addedButtons = {}

        formData.forEach((value, key) => {
            addedButtons[key] = value
        })

        await Page.updateOne({ owner: session?.user?.email }, {
            buttons: addedButtons
        })
        return true;
    }

    return false;
}

export default UpdateUserLinks
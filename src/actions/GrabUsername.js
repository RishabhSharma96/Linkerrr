'use server'

import { Loginoptions } from "@/app/api/auth/[...nextauth]/route";
import { Page } from "@/models/Page";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";


const GrabUsername = async (formData) => {
    const linkerrrUsername = formData.get("username");
    mongoose.connect(process.env.MONGODB_URI)
    
    const session = await getServerSession(Loginoptions)

    const doesUserExist = await Page.findOne({ uri: linkerrrUsername })

    if (doesUserExist) {
        return false;
    }
    else {
        return await Page.create({
            uri: linkerrrUsername,
            owner: session?.user?.email
        })
    }
}

export default GrabUsername
'use server'

import { Page } from "@/models/Page";
import mongoose from "mongoose";
import { redirect } from "next/navigation";

const GrabUsername = async (formData) => {
    const linkerrrUsername = formData.get("username");
    mongoose.connect(process.env.MONGODB_URI)

    const doesUserExist = await Page.findOne({ uri: linkerrrUsername })

    if (doesUserExist) {
        return false;
    }
    else {
        return await Page.create({
            uri: linkerrrUsername,
        })
    }
}

export default GrabUsername
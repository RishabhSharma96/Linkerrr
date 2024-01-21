import { Schema, model, models } from "mongoose";

const PageSchema = new Schema({

    uri: {
        type: String,
        unique: true,
        required: true,
    },
    owner: {
        type: String,
        reqired: true,
    },
    name: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        default: ""
    },
    location: {
        type: String,
        default: ""
    }

}, { timestamps: true })

export const Page = models?.Page || model("Page", PageSchema)
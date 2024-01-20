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

}, { timestamps: true })

export const Page = models?.Page || model("Page", PageSchema)
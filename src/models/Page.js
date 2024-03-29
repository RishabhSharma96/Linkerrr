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
    },
    bgType: {
        type: String,
        default: "Color"
    },
    bgColor: {
        type: String,
        default: "#808080"
    },
    bgImageUrl: {
        type: String,
        default: ""
    },
    buttons: {
        type: Object,
        default: {}
    },
    links: {
        type: [],
        default: []
    }

}, { timestamps: true })

export const Page = models?.Page || model("Page", PageSchema)
import { Event } from "@/models/Event";
import mongoose from "mongoose";


export async function POST(req) {
    mongoose.connect(process.env.MONGODB_URI)
    const url = new URL(req.url)
    const page = url.searchParams.get('page')
    const clickedURL = atob(url.searchParams.get('url'))
    await Event.create({
        eventType: "click",
        uri: clickedURL,
        page: page
    })
    return Response.json(true)
}
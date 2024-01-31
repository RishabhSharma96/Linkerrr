import { Schema, model, models } from "mongoose";

const EventSchema = new Schema({

    uri: {
        type: String,
    },
    eventType: {
        type: String,
    },
    page: {
        type: String,
    }
}, { timestamps: true })

export const Event = models?.Event || model("Event", EventSchema)
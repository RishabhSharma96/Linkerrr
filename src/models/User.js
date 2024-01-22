import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({

    name: {
        type: String,
    },
    email: {
        type: String,
    },
    image: {
        type: String,
    },
    emailVerified: {
        type: Date,
    }

}, { timestamps: true })

export const User = models?.User || model("User", UserSchema)
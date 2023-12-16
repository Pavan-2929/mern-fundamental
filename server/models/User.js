import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: String,
    age: Number,
})

const User = mongoose.model("User", userSchema)

export default User
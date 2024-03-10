const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "admin"
    },
    amount: {
        type: Number,
        required: true,

    }
    ,
    date: {
        type: String,
        required: true
    },

}, { timestamps: true })

module.exports = mongoose.model("user", userSchema)
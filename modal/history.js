const mongoose = require("mongoose")


const historySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "admin"
    },

    action: {
        type: String,
        enum: ["credit", "debit"],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    })


module.exports = mongoose.model("history", historySchema)
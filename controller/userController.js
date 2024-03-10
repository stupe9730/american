const asyncHanlder = require("express-async-handler")
const User = require("../modal/User")
const history = require("../modal/history")


exports.getAllBlance = (asyncHanlder(async (req, res) => {
    try {
        const { userId } = req.params
        const result = await User.findOne({ userId })
        const his = await history.find({ userId })
        res.status(200).json({ message: "Blance Create Success", result: { result, history: his } })
    } catch (error) {
        res.status(400).json({ message: error.message || "Something Went Wrong" })
    }
}))



exports.UpdateBlance = (asyncHanlder(async (req, res) => {
    try {

        const { userId } = req.params
        const { amount, action, date } = req.body


        const result = await User.findOne({ userId })


        if (!result && action === "debit") {
            return res.status(400).json({ message: "You have no sufficient balance" })
        }

        if (!result) {
            await User.create({ userId, amount, date })
            await history.create({ userId, action, amount, date })
            return res.status(201).json({ message: "Amount add success" })
        }

        if (result.amount < amount && action === "debit") {
            return res.status(400).json({ message: "You have no sufficient balance" })
        }

        if (action === "debit") {
            const previousAmount = result.amount
            const newAmount = previousAmount - +amount
            await User.findByIdAndUpdate(result._id, { amount: newAmount })
            await history.create({ userId, action, amount, date })
            return res.status(200).json({ message: "Amount Debit success" })
        } else if (action === "credit") {
            const previousAmount = result.amount
            const newAmount = previousAmount + +amount
            await User.findByIdAndUpdate(result._id, { amount: newAmount })
            await history.create({ userId, action, amount, date })
            return res.status(200).json({ message: "Amount credit success" })
        }

    } catch (error) {
        res.status(400).json({ message: error.message || "Something Went Wrong" })
    }
}))



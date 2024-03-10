const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const path = require("path")
require("dotenv").config({ path: "./.env" })
mongoose.connect(process.env.MONGO_URL)
const cors = require("cors")


const app = express()


app.use(express.json())
// app.use(express.json())
app.use(express.static(path.join(__dirname, "dist")))
// app.use(express.static())
app.use(cors({
    credentials: true,
    origin: "https://american-bpc8.onrender.com"
}))
app.use(cookieParser())
app.use("/api/v1/admin", require("./route/adminRoutes"))
app.use("/api/v1/user", require("./route/userRoutes"))



app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message || "Something Went Wrring" })
})
app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"))
})

mongoose.connection.once("open", () => {
    console.log("MONGOOSE CONNECT")
    app.listen(process.env.PORT, console.log("SERVER RUNNING"))
})

const { register, login } = require("../controller/adminController")

const router = require("express").Router()

router
    .post("/register", register)
    .post("/login", login)

module.exports = router
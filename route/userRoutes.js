const { getAllBlance, UpdateBlance, } = require("../controller/userController")

const router = require("express").Router()

router
    .get("/get-blance/:userId", getAllBlance)
    .put("/credit/:userId", UpdateBlance)

module.exports = router
const bcrypt = require("bcryptjs")
const Admin = require("../modal/Admin")
const JWT = require("jsonwebtoken")
const User = require("../modal/User")


exports.register = async (req, res) => {
    console.log(req.body)
    try {
        const { password } = req.body
        const hashpass = await bcrypt.hash(password, 10)
        await Admin.create({ ...req.body, password: hashpass })
        // await User.create({ amount: 0, action: "credit", date: new Date(), history: [] })
        const result = await User.find()
        res.status(201).json({ message: "User Regiser Success", result })
    } catch (error) {
        res.status(500).json({ message: error.message || "Something Went Wrong" })
    }
}
const jwt = require('jsonwebtoken'); // Make sure to install the 'jsonwebtoken' package

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // email valid
        const result = await Admin.findOne({ email });
        if (!result) {
            return res.status(401).json({ message: "Invalid Email" });
        }

        // verify password
        const verify = await bcrypt.compare(password, result.password);
        if (!verify) {
            return res.status(401).json({ message: "Invalid Password" });
        }
        const newtok = await Admin.find()
        // Generate a token with user data
        const token = jwt.sign(
            {
                _id: result._id,
                email: result.email,
                // Add other necessary data here
            },
            process.env.JWT_KEY, // Replace with your actual secret key
            { expiresIn: '1h' } // Set the expiration time as needed
        );

        // Send the token as a cookie
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // maxAge is in milliseconds (1 hour in this example)
        res.status(200).json({
            message: "User login Success",
            result: {
                name: result.name,
                _id: result._id,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message || "Something Went Wrong" });
    }
};

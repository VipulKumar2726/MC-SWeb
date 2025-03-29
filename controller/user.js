const User = require("../models/user");
const bcrypt = require("bcryptjs");
const {setUser} = require("../services/auth");

async function handleUserSignup(req, res) {
    try {
        const { firstName, lastName, email, password } = req.body;
        // Check if user already exists
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Create user
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });
        // console.log("sfdfdsfdf",req.body )

        return res.status(201).json({ message: "User Register Successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }

}

async function handleUserLogin(req, res) {
    try {

        const { email, password } = req.body;

         // Validate input fields
         if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Check if user  exists
        let existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

         // Compare hashed password
         const isPasswordValid = await bcrypt.compare(password, existingUser.password);
         if (!isPasswordValid) {
             return res.status(400).json({ message: "Invalid username or password" });
         }

         const token = setUser(existingUser);
        //  res.cookie("uid", token);
         
        return res.status(200).json({ message: "User Login Successfully", token  });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }

}

module.exports = {
    handleUserSignup,
    handleUserLogin,
}
const jwt = require('jsonwebtoken');
const User = require("../model/userSchema");
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

const Authenticate = async (req, res, next) => {

    try {

        const token = req.cookies;
        const jToken = token.jwttoken;
        const verifiyToken = jwt.verify(jToken, process.env.SECRET_KEY);
        // console.log(verifiyToken)
        // res.send(verifiyToken)

        const rootUser = await User.findOne({ _id: verifiyToken._id, "tokens.token": jToken });
        // res.send('verify rootUser')

        if (!rootUser) {
            console.log('User not found');
        } else {
            console.log('user found');
        }

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();

    } catch (err) {
        res.status(401).send("Unautorized: No token Provided...")
        console.log(err.message)
    }
}

module.exports = Authenticate;

// to signup new user

const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = "ghjjjjkhhkljlklhkghgjhfffjhgjhfhu#"

router.post("/createuser",
    [body('email').isEmail(),
    // password must be at least 5 chars long
    body('password', 'incorrect password').isLength({ min: 5 }),
    body('name').isLength({ min: 5 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const salt = await bcrypt.genSalt(10);
        let secPass = await bcrypt.hash(req.body.password, salt)

        try {
            await User.create({
                name: req.body.name,
                password: secPass,
                email: req.body.email,
                location: req.body.location
            })
            res.json({ success: true });
        } catch (error) {
            console.log(error)
            res.json({ success: false });
        }

    })


router.post("/loginuser", [body('email').isEmail(),
// password must be at least 5 chars long
body('password', 'incorrect password').isLength({ min: 5 })], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let email = req.body.email;
    try {
        let userData = await User.findOne({ email });
        if (!userData) {
            return res.status(400).json({ errors: "please write valid credentials" });
        }

        const passComp = await bcrypt.compare(req.body.password, userData.password)

        if (!passComp) {
            return res.status(400).json({ errors: "please write valid credentials" });
        }
        const data = {
            user: {
                id: userData.id
            }
        }
        const authToken = jwt.sign(data, jwtSecret)

        return res.json({ success: true, authToken: authToken });

    } catch (error) {
        console.log(error)
        res.json({ success: false });
    }

})

module.exports = router;
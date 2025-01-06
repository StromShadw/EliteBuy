const Users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
require('dotenv').config();

const userCtrl = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            console.log('Register Request:', req.body);

            const user = await Users.findOne({ email });
            if (user) return res.status(400).json({ message: "This email already exists" });

            if (password.length < 6) return res.status(400).json({ message: "Password should be at least 6 characters long" });

            const passwordHash = await bcrypt.hash(password, 10);
            const newUser = new Users({ name, email, password: passwordHash });

            const accesstoken = createAccessToken({ id: newUser._id });
            const refreshtoken = createRefreshToken({ id: newUser._id });

            res.cookie("refreshtoken", refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
            });
            
            await newUser.save();

            await sendEmail({
                to: email,
                dynamicTemplateData: {
                    name:name,
                    email: email,
                    password: password
                },
            });
            
            return res.json({ accesstoken });
        } catch (error) {
            console.error('Error during registration:', error);
            return res.status(500).json({ message: error.message });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await Users.findOne({ email })

            if (!user) return res.status(400).json({ mes: 'user does not exist' })

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(400).json({ mes: 'Incorrect Password' })

            const accesstoken = createAccessToken({ id: user._id });
            const refreshtoken = createRefreshToken({ id: user._id });
            res.cookie("refreshtoken", refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
            });

            return res.json({mes:"Login Success!", accesstoken,refreshtoken });
        } catch (error) {
            return res.status(500).json({ mes: error.message });
        }
    },

    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', { path:'/user/refresh_token' } )
            return res.json({ mes: "Logged Out" });

        } catch (error) {
            return res.status(500).json({ mes: error.message });
        }
    },

    refreshToken: async (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken;
            if (!rf_token) return res.status(400).json({ mes: 'Please Login or Register' });

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) return res.status(400).json({ mes: "Login or Register Now" });
                const accesstoken = createAccessToken({ id: user.id });
                return res.json({ accesstoken });
            });

        } catch (error) {
            return res.status(500).json({ mes: error.message });
        }
    },
    getUser: async (req,res)=>{
        try {
            const user = await Users.findById(req.user.id).select('-password')
            if(!user) return res.status(400).json({mes:"user does not exit"})
            
            return res.json(user)
        } catch (error) {
            return res.status(500).json({ mes: error.message });
        }
    },
    addCart: async (req,res)=>{
        try {
            const user = await Users.findById(req.user.id)
            if(!user) return res.status(400).json({mes:"user does not exit"})
            await Users.findOneAndUpdate({_id:req.user.id},{
                cart:req.body.cart
        })
            return res.json({mes:"added to Cart"})
        } catch (error) {
            return res.status(500).json({ mes: error.message });
        }
    }
};


const sendEmail = async ({ to, dynamicTemplateData }) => {
    const msg = {
        to,
        from: {
            name: "Ecommerce Web By Paresh",
            email: process.env.FROM_EMAIL
        },
        templateId: process.env.TEMPLATE_ID,
        dynamicTemplateData,
    };

    try {
        await sgMail.send(msg);
        console.log("Email sent successfully to", to);
    } catch (error) {
        console.error("Error sending email:", error.response?.body || error);
    }
};




const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

module.exports = userCtrl;
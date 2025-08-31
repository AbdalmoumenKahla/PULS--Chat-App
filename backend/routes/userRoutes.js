const express = require('express');
const userRouter = express.Router();
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');

// User registration
userRouter.post('/register', async (req, res) => {
    try{
        const {username, email, password} = req.body;
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message: 'User already exists'});
        }
        const user = await User.create({username, email, password});
        res.status(201).json({message: 'User registered successfully', user});
    }catch(error){
        res.status(500).json({message: 'Server error', error});
    }
});

// User login
userRouter.post('/login', async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: 'Invalid credentials'});
        }
        const isMatch = await user.matchPassword(password);
        if(!isMatch){
            return res.status(400).json({message: 'Invalid credentials'});
        }
        res.status(200).json({
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            }
        });

    }catch(error){
        res.status(500).json({message: 'Server error', error});
    }
});

// generate JWT token
const generateToken = (userId) => {
    return jwt.sign({userId}, process.env.JWT_SECRET, { expiresIn: '1h' });
}

module.exports = userRouter;
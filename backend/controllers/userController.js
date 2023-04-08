const User = require('../module/userModel');
const asyncHandler = require("express-async-handler")
const generateToken = require("../utils/generateToken")

const registerUser = asyncHandler( async (req, res) => {
        const {email, password} = req.body;
        
        const userExists = await User.findOne({email})
    
        if(userExists)
        {
            res.status(400);
            throw new Error("user already exits");
        }
    
        const user = await User.create({
            email,
            password,
        });
    
        if(user){
            res.status(201).json({
                _id : user._id,
                email : user.email,
                msg : "user succesfully created",
                token : generateToken(user._id),
            })
        }
        else
        {
            res.status(400);
            throw new error("something went wrong during insertion into db");
        }
    }
);

const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    const userConn = await User.findOne({email});

    if(userConn  && (await userConn.matchPassword(password))){
        res.json({
            _id : userConn._id,
            email: userConn.email,
            password : userConn.password,
            token : generateToken(userConn._id),
        })
    }
    else
    {
        res.status(400);
        throw new Error("Invalid Email or password !");
    }
})

module.exports = {registerUser, authUser};
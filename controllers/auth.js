import User from '../models/User.js';
import bcrypt from "bcryptjs";
import { createError } from '../config/error.js';
import jwt from "jsonwebtoken";


export const registerController = async (req, res, next) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    
    const newUser = new User({
        ...req.body,
        username: req.body.username.toLowerCase(),
        email: req.body.email.toLowerCase(),
        password: hash
    })
    try{
    await newUser.save()
    res.status(200).send("User has been created")
    }catch(err){
        next(err)
    }
    
}

export const loginController = async (req, res, next) => {
    try{
    let user = null;
    user =  await User.findOne({email:req.body.id.toLowerCase()});
    if(!user) user =  await User.findOne({username:req.body.id.toLowerCase()});
    if (!user) return next(createError(404, "This account does not exist"))
    const passwordCorrect = bcrypt.compareSync(`${req.body.password}`,user.password);
    if(!passwordCorrect) return next(createError(400, "Wrong Credentials"))
    const token = jwt.sign({id:user._id, isAdmin:user.isAdmin}, process.env.SECRET_KEY)
    const {password, ...otherDetails} = user._doc
    res.cookie("accesstoken", token, {
        httpOnly: true,
    }).status(200).json({...otherDetails})
}catch(err) {
    next(err)
}
}

export const logout = (req, res) => {
    res.clearCookie('accesstoken',{
        sameSite:"none",
        secure:true
    }).status(200).json("User has been logged")
}
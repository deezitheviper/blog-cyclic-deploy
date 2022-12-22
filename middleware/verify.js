import jwt from 'jsonwebtoken';
import { createError } from './error.js';

export const verifyToken = (req,res, next) => {
    const token = req.cookies.accesstoken;
    if(!token || token === undefined) return  next(createError(401, "You're not authenticated"))

    jwt.verify(token, process.env.SECRET_KEY, (err, user)=> {
        if(err) return next(createError(403, "Token is invalid"))
        req.user = user;
        next()
    })
}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if(req.user.id == req.params.id || req.user.isAdmin){
            next()
        }else{
            return next(createError(403, "You're not authenticated"))
        }
    })
}

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, ()=> {
        if(req.user == undefined) return next(createError(401, "You're not authenticated"))
        if(req.user.isAdmin) return next()
        else return next(createErr(403, "You're not an administrator"))
    })
}
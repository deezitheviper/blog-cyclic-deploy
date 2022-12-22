import User from '../models/User.js';
import { createError } from './error.js';

export const checkDuplicate =  (req, res, next) => {
   
    User.findOne({username: req.body.username})
    .exec((err, user) => {
        if(err) return next(err)
        if(user){
            return next(createError(500, "Failed! Username is already in use!"))
        }
    })
    User.findOne({email: req.body.email})
    .exec((err, user) => {
        if(err) return next(err)
        if(user){
            return next(createError(500, "Failed! Email is already in use!"))
        }
    })

    return next();
}
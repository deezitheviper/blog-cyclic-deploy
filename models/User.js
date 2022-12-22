import mongoose from 'mongoose';
const { Schema } = mongoose;



const userSchema = new Schema({
  username:{
    type: String,
    trim: true,
    required: true,
    unique: true,
},
   email:{
    type:String,
    trim:true,
    required: true,
    unique:true,
},
profilepic:{
    type:String,
    default:'https://res.cloudinary.com/deezi/image/upload/v1662340110/upload/u77bphsn8u9s03mxutll.jpg'
},

password:{
    type:String,
    trim:true,
    required: true
},
isAdmin:{
    type:Boolean,
    default: false
},



},{timestamps: true});

export default mongoose.model("user", userSchema)
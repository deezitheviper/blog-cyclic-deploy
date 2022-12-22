import mongoose from 'mongoose';
const { Schema } = mongoose;

const postSchema = new Schema({

    title:  {
        type:String,
        required: true,
        unique: true
    },
    authur: {
       type: Schema.Types.ObjectId, ref:'user',
        required: true,
    },
    img:{
        type:String,
    },
    cat: {
        type:String,
        required: true,
    },
    body: {
        type:String,
        required: true,
    },
    slug:{
        type:String,
        required: true,
        unique: true
    },
    likes:{
        type: [String],
        default: []
    },
    comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'comment'
            }
        ],
    date: { type: Date, default: Date.now, required:true },
    hidden: Boolean,
    meta: {
      votes: Number,
      favs:  Number
    }
},{timestamps: true});

export default mongoose.model("post", postSchema)
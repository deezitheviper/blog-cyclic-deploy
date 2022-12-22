import mongoose from "mongoose";
const {Schema} = mongoose;

const Comment = new Schema({
    authur: {
        type: Schema.Types.ObjectId, ref: 'user',
        required: true
    },
    body: {
        type:String,
        required: true,
    },
        date: { type: Date, default: Date.now},
     likes:{
        type: [String],
        default: []
    }
})

export default mongoose.model('comment', Comment)
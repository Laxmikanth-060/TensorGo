import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    chatName:{
        type:String,
        require:true,
    },
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course',
        require:true,
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require:true, 
    }],
    instructorId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'User',          //change this to insturcor for admin prevelages
    },
    latestMessage:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'Message',
    },
    isGroupChat:{
        type:Boolean,
        default:false,
    }
},{timestamps:true});

const Chat = mongoose.model('Chat',chatSchema);

export default Chat;
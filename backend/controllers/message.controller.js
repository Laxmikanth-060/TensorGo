import Chat from '../models/chat.model.js';
import User from '../models/user.model.js';
import Message from '../models/message.model.js';

export const sendMessage=async (req,res)=>{
    const {content,chatId}=req.body;

    if(!content || !chatId){
        console.log("Invalid data passed");
        return res.status(400).json("Error in fertch semnd Mesage controller");
    }

    var newMessage={
        sender:req.user._id,
        content:content,
        chat: chatId,
    };
    
    try{

        var message=await Message.create(newMessage); 

        message=await message.populate("sender","username profileImg");
        message=await message.populate("chat");
        message=await User.populate(message,{
            path: "chat.users",
            select:"username profileImg email",
        });

        await Chat.findByIdAndUpdate(req.body.chatId,{
            latestMessage:message,
        })

        res.status(200).json(message);

    }catch(error){

        console.log(error);
    res.status(400).json("Error in fetch Message controller");
    }
}

export const allMessages=async (req,res)=>{
    try{

        const messages = await Message.find({ chat: req.params.chatId}).populate(
            "sender",
            "username profileImg email"
        ).populate("chat");

        res.status(200).json(messages);

    } catch(error){
        console.log(error);
        res.status(400).json("Error in fetch AllMessage controller");
    }
}
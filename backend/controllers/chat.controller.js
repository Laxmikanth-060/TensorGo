import User from "../models/user.model.js";
import Chat from "../models/chat.model.js";

export const accessChat = async (req, res) => {
  try {
    const currUserId = req.user._id;
    const userId = "66a4b98ef21049e2a37d6e1c";
    if (!userId) {
      console.log("User not found");
      return res.status(400).json("error");
    }

    var isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: currUserId } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "username profileImg email",
    });

    if (isChat.length) {
      res.send(isChat[0]);
    } else {
      var chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [currUserId, userId],
      };

      try {
        const createdChat = await Chat.create(chatData);
        const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
          "users",
          "-password"
        );

        res.status(200).send(FullChat);
      } catch (error) {
        console.log(error);
        res.status(400).json(error);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchChats = async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
    .populate("users","-password")
    .populate("instructorId","-password")
      .populate("latestMessage")
      .sort({updatedAt: -1})  
    .then(async (results)=>{
        results=await User.populate(results,{
            path:"latestMessage.sender",
            select: "username profileImg email",
        })

       res.status(200).send(results);
    }) 
  } catch (error) {
    console.log(error);
    res.send(400).json("Error in fertch chat controller");
  }
};

export const createGroupChat = async (req,res)=>{
    if(!req.body.users || !req.body.name){
        return res.status(400).send("Unfilled Data")
    } 

    var users = JSON.parse(req.body.users);

    if(users.length<2){
        return res.status(400).send("More than 2 req");
    }

    users.push(req.user);

    try{

        const groupChat = await Chat.create({
            chatName: req.body.name,
            users : users,
            isGroupChat:true,
            instructorId:req.user,
        })

        const fullGroupChat=await Chat.findOne({_id:groupChat._id})
          .populate("users","-password")
          .populate("instructorId","-password");
          
          res.status(200).json(fullGroupChat);

    }catch(error){
        console.log(error);
        res.status(400).send("problem in group creation");
    }
}

export const renameGroup = async (req,res)=>{
    const {chatId,chatName}=req.body;

    const updatedChat  = await Chat.findByIdAndUpdate(
        chatId,
        {
            chatName,
        },
        {
            new:true,
        }
    )
    .populate("users","-password")
    .populate("instructorId","-password");

    if(!updatedChat){
        res.status(404).send("chat not found");
    }else{
        res.status(200).json(updatedChat);
    }
}

export const addToGroup = async (req, res) => {
    const { chatId, userId } = req.body;

    try {
        const added = await Chat.findByIdAndUpdate(
            chatId,
            {
                $push: { users: userId },
            },
            { new: true }
        )
        .lean() // Convert to plain JavaScript object
        .populate("users", "-password")
        .populate("instructorId", "-password");

        if (!added) {
            return res.status(404).send("User not found");
        }

        res.status(200).json(added);
    } catch (error) {
        console.error("Error adding user to group:", error);
        res.status(500).send("Internal Server Error");
    }
};

export const removeFromGroup =async (req,res)=>{
    const {userId,chatId}=req.body;

    const removed= await Chat.findByIdAndUpdate(
        chatId,
        {
            $pull: {users:userId},
        },
        { new:true }
    )
    .populate("users","-password")
    .populate("instructorId","-password");

    if(!removed){
        res.status(404).send("user not found");
      }
      else{
        res.status(200).json(removed);
      }
}
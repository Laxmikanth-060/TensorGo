import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true
    },
    fullName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    },
    profileImg:{
        type:String,
        default:"https://i.ibb.co/BTG6sJ9/user-removebg-preview.png",
    },
    coverImg:{
        type:String,
        default:"https://i.ibb.co/hdV1NwF/web-banner.png",
    },
    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        default:null,
    },
    instructorId:{
        type:mongoose.Schema.Types.ObjectId,
        default:null,
    },
    isSuperAdmin:{
        type:Boolean,
        default:false,
    },
    verified:{
        type:Boolean,
        default:false,
    }
    
},{timestamps:true});


const User = mongoose.model("User",userSchema);

export default User;
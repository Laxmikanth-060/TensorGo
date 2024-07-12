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
        minLength:4
    },
    profileImg:{
        type:String,
        default:"https://i.ibb.co/BTG6sJ9/user-removebg-preview.png",
    },
    coverImg:{
        type:String,
    }
    
},{timestamps:true});


const User = mongoose.model("User",userSchema);

export default User;
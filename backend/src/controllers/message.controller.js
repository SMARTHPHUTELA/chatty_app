import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js"

export const getUsersForSidebar=async(req,res)=>{
    try {
        const loggedInUserId=req.user._id;
        const filteredUsers=await User.find({_id:{$ne: loggedInUserId} }).select("-password");
        return res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getUsersForSideBar Controller",error.message);
        return res.status(500).json({message:"Internal Server Error"});
        
    }
}

export const getMessages=async (req,res)=>{
    try {
        const {id:userChatId}=req.params;
        const myId=req.user._id;
        const messages=await Message.find({
            $or:[
                {senderId:userChatId,receiverId:myId},
                {senderId:myId,receiverId:userChatId},
            ],
        });
        return res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages Controller",error.message);
        return res.status(500).json({message:"Internal Server error"});
    }
}

export const sendMessage=async (req,res)=>{
    try {
        const senderId=req.user._id;
        const {id:receiverId}=req.params;
        const {text,image}=req.body;

        let imageUrl;
        if(image){
            const uploadResponse=await cloudinary.uploader.upload(image);
            imageUrl=uploadResponse.secure_url;
        }
        const newMessage=new Message({
            senderId:senderId,
            receiverId:receiverId,
            text:text,
            image:imageUrl,
        });
        await newMessage.save();
        return res.status(201).json(newMessage);


    } catch (error) {
        console.log("Error in sendMessage Controller",error.message);
        return res.status(500).json({message:"Internal Server Error"});
        
    }
}
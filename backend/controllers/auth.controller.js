import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req,res)=>{
   try{
    const {fullName,userName,passWord,confirmPassword,gender} = req.body;

    if(passWord !== confirmPassword){
        return res.status(400).json({error:'Passwords do not match!!!'});
    }

    const user = await User.findOne({userName});
    if(user){
        return res.status(400).json({error:'Username already exists!!!'});
    }

    //HASH password here
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(passWord,salt);

    const malePp =`https://avatar.icon.iran.liara.run/public/boy?username=${userName}`;
    const femalePp =`https://avatar.icon.iran.liara.run/public/girl?username=${userName}`;

    const newUser = new User({
       fullName,
       userName,
       passWord:hashedPassword,
       gender,
       profilePic:gender === "male" ? malePp:femalePp
       
    });

  if(newUser){
    generateTokenAndSetCookie(newUser._id,res);
    await newUser.save();  
    res.status(201).json({
        _id:newUser._id,
        fullName: newUser.fullName,
        userName:newUser.userName,
        profilePic:newUser.profilePic
    });
  }else{
    res.status(400).json({error:"Invalid user data!!!"});
  }

   }catch(error){
      console.log('Error in signup controller',error.message);
      res.status(500).json({error:"Internal server error"});
   }
};

export const login = async (req, res) => {
    try {
      const { userName, passWord } = req.body;
      const user = await User.findOne({ userName });
      const isPassWordCorrect = await bcrypt.compare(passWord, user?.passWord || "");
  
      if (!user || !isPassWordCorrect) {
        return res.status(400).json({ error: "Invalid username or password" });
      }
  
      generateTokenAndSetCookie(user._id, res);
  
      res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        userName: user.userName,
        profilePic: user.profilePic
      });
  
    } catch (error) {
      console.log('Error in login controller', error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };

export const logout = (req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged out succesfully!!!"})
    } catch (error) {
        console.log('Error in logout controller', error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
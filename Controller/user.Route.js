const express=require("express");
const userRouter=express.Router();
const {UsersModel}=require("../Model/user.model");
const {BlacklistModel}=require("../Model/blacklistModel");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");



userRouter.get("/",(req,res)=>{
    res.send("users page")
})
userRouter.post("/register",async(req,res)=>{
    try{
         let data=req.body;
         console.log(data);
        let isExist=await UsersModel.find(req.body);
        console.log(isExist);
         if(isExist.length){
            res.send("User already exists");
         }else{
            bcrypt.hash(data.password, 5, async(err, hash)=> {
    // Store hash in your password DB.
    if(err){
        res.send({error:err.message,});
    }else{
            let newUser=new UsersModel({...data,password:hash});
            await newUser.save();
            res.send("Registered Successfully");
    }
          
});
         }
    }catch(err){
        res.send({msg:err.message});
    }
})

userRouter.post("/login",async(req,res)=>{
    try{
         let {email,password}=req.body;
         let data=await UsersModel.findOne({email});
         console.log(data);
         if(data){
            bcrypt.compare(password,data.password, function(err, result) {
    // result == true
           if(err){
            res.status(200).send({msg:err.message});
           }else if(result){
            // console.log({userId:data[`_id`]},"id");
            let token=jwt.sign({userId:data[`_id`],username:data.username}, 'user', { expiresIn: 60 * 60 });
            res.status(200).send({msg:"Login Successfull",token:token});
           }
});
         }else{
            res.send("User doesnot exists");
         }
    }catch(err){
        res.status(400).send({msg:err.message});
    }
})

userRouter.post("/logout",async(req,res)=>{
    try{
          let token=req.headers.authorization?.split(" ")[1]||null;
          let logout=new BlacklistModel({token:token});
          await logout.save();
          res.send("done");
    }catch(err){
        res.send({msg:err.message});
    }
})
module.exports={
    userRouter
}
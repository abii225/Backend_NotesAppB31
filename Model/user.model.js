const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    username:String,
    email:String,
    password:String
},{
    versionKey:false
});

const UsersModel=mongoose.model("Alluser",userSchema);

module.exports={
    UsersModel
}
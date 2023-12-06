
const jwt=require("jsonwebtoken");
const {BlacklistModel}=require("../Model/blacklistModel");

async function auth(req,res,next){
    let token=req.headers.authorization?.split(" ")[1]||null;
    // check the token
    if(token){
        jwt.verify(token, 'user', function(err, decoded) {
      console.log(token)
      if(decoded){
        // console.log(decoded,"hi");
        const {userId,username}=decoded;
        console.log(userId,username);
        req.body.userId=userId;
        req.body.username=username;
        next();
      }else{
        res.status(404).send("You are not authorized, please login");
      }
});
    }else{
        res.send("You are not authorized, please login ");
    }
   
}

module.exports={
    auth
}
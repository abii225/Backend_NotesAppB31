const express=require("express");
const app=express();
const {connection}=require("./DB/db");
const {userRouter}=require("./Controller/user.Route");
const {notesRouter}=require("./Controller/note.Route");
app.use(express.json());



app.use("/users",userRouter);
app.use("/notes",notesRouter);

app.get("/",(req,res)=>{
    res.send("homepage")
})

app.listen(8080,async()=>{
    try{
          await connection
          console.log("DB connected..")
          console.log("server is running...http://127.0.0.1:8080")
    }catch(err){
        console.log(err);
    }
    
})
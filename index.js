const express=require("express");
const app=express();
const {connection}=require("./DB/db");
const {userRouter}=require("./Controller/user.Route");
const {notesRouter}=require("./Controller/note.Route");
const cors=require("cors");
app.use(cors());

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("homepage")
})

app.use("/users",userRouter);
app.use("/notes",notesRouter);



app.listen(8080,async()=>{
    try{
          await connection
          console.log("DB connected..")
          console.log("server is running...http://localhost:8080")
    }catch(err){
        console.log(err);
    }
    
})
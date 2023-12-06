const express=require("express");
const {NoteModel}=require("../Model/note.model");
const {auth}=require("../Middleware/auth");

const notesRouter=express.Router();

notesRouter.get("/",auth,async(req,res)=>{
    try{
        const {userId,username}=req.body;
let allnotes=await NoteModel.find({userId,username});
    res.send({msg:"All Notes",allnotes});
    }catch(err){
         res.status(400).send({msg:err.message});
    }
})

notesRouter.post("/add",auth,async(req,res)=>{
    try{
            let data=req.body;
           let newNote=new NoteModel(data);
           await newNote.save();
           res.status(200).send("Note added Successfully");
    }catch(err){
        res.status(400).send({msg:err});
    }
})

notesRouter.patch("/update/:id",async(req,res)=>{
    try{
          let id=req.params;
          let updateData=req.body;
          await NoteModel.findByIdAndUpdate({_id:id},...updateData);
          res.status(200).send({msg:"Note Updated"});

    }catch(err){
        res.status(400).send({msg:err});
    }
})

notesRouter.delete("/delete/:id",async(req,res)=>{
    try{
          let {id}=req.params;
          let updateData=req.body;
          await NoteModel.findByIdAndDelete({_id:id});
          res.status(200).send({msg:"Note Deleted"});

    }catch(err){
        res.status(400).send({msg:err});
    }
})


module.exports={
    notesRouter
}
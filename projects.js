const express=require('express');
const mongoose=require('mongoose');
const { timeStamp } = require('node:console');
const router = express.Router();
const fs = require('fs');
const path = require('path');
 
const projectSchema =new mongoose.Schema({
title:{type:String,required:true},
myrole:{type:String ,required:true }
,framework:String,imgURL:String,
description:{type:String,required:true}  ,projectlink:String
},{timestamps:true}) 

const Project=mongoose.model('project',projectSchema);
// showing my projects
router.get('/',async (req,res)=>{
    const myprojects= await Project.find();
    res.status(200).json(myprojects)
})  
const holdimg= require('./utilities/upload.project')
router.post('/',holdimg.single('img'),async (req,res)=>{
 try {
  const imgUrl=req.file.filename ?req.file.filename:null;
  const {title,myrole,framework,description}=req.body;
  const savedProject = await Project.create({
      title, myrole, framework, description, imgURL
    });
    
    res.status(201).json(savedProject);
    
  } catch (error) {
    res.status(400).json({ error: error.message });

    }
})
router.put('/:oldTitle', holdimg.single('img'), async (req, res) => {
    try {
        const { oldTitle } = req.params;
        const { title, myrole, framework, description } = req.body;

        const project = await Project.findOne({ title: oldTitle });
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        const updateData = { title, myrole, framework, description };

        
        if (req.file) {
            updateData.imgURL = req.file.filename; 
         if (project.imgURL) {
       const oldImagePath = path.join(process.cwd(), 'projects.uploads', project.imgURL);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlink(oldImagePath, (err) => {
                        if (err) console.error("FileSystem Error:", err);
                    });
                }
            }
        }
        const result = await Project.findOneAndUpdate(
            { title: oldTitle }, 
            { $set: updateData },
            {new:true}
        );

        res.status(200).json({ message: "Project updated successfully", result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.delete('/:title', async (req, res) => {
    try {
        const { title } = req.params;
        const project = await Project.findOne({ title: title });

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        if (project.imgURL) { 
            const imagePath = path.join(process.cwd(), 'uploads', project.imgURL);
            
            if (fs.existsSync(imagePath)) {
                fs.unlink(imagePath, (err) => {
                    if (err) console.error("File deletion error:", err);
                });
            }}
        await Project.deleteOne({ title: title });

        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports =router;

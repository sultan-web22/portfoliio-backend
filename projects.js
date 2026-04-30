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
// adding project with details --- untested yettttttttttttt
const holdimg= require('./utilities/upload')
router.post('/',holdimg.single('img'),async (req,res)=>{
 try {
  const imgUrl=req.file.filename;
  const savedProject = await Project.create({
      title, myrole, framework, description, imgURL
    });
    
    res.status(201).json(savedProject);
    
  } catch (error) {
    res.status(400).json({ error: error.message });

    }
})

const projectsToInsert = [
    {
        title: "Portfolio Website",
        myrole: "Frontend Developer",
        framework: "React",
        description: "A personal portfolio to showcase my coding journey."
    },
    {
        title: "Task Manager API",
        myrole: "Backend Developer",
        framework: "Node.js & Express",
        description: "A RESTful API for managing daily tasks with user authentication."
    },
    {
        title: "E-commerce Dashboard",
        myrole: "Fullstack Developer",
        framework: "Next.js",
        description: "A real-time dashboard for tracking sales and inventory."
    },
    {
        title: "Weather App",
        myrole: "Lead Developer",
        framework: "Vue.js",
        description: "An app that fetches live weather data using the OpenWeather API."
    }
];
 
// should be deleted only for testing
const seedDatabase = async () => {
    try {
        await project.insertMany(projectsToInsert);
        
    } catch (err) {
        console.error("Error seeding data:", err);
    }
}; seedDatabase();


module.exports =router;

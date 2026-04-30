const mongoose=require('mongoose');
const express= require('express');
const router =express.Router();
const fs = require('fs');
const path =require('path');

const serviceSchema=new  mongoose.Schema ({
   name:{Type:String,required:true},description:{type:String,required:true},imgURl:String 
},{timestamps:true})
const service = mongoose.model('service',serviceSchema);


router.get('/',async(req,res)=>{
 const myservice = await service.find();
 res.status(200).json(myservice)
})


const fileimg=require('./utilities/upload.service');
router.post('/',fileimg.single('img'), async(req,res)=>{
  try{ const{name,description}=req.body;
    imgURl=req.file.filename;
    const savedservice=await service.create({name,description,imgURl});
    res.status(201).json(savedservice)}
    catch(err){
      res.status(400).json({err:err.message}) 
    }
}) 

router.put('/oldname',fileimg.single('img'),async (req,res)=>{
    try{const {oldname}=req.params;
    const {name,description}=req.body;
    const reqservice = await service.findone({name:oldname});
    if(!reqservice){res.status(404).json({message:'service name not found'})}
    const updateddata={name,description,imgURL};
    if(req.file){
        updateddata.imgURL=req.file.filename;
         if (project.imgURL) {
                 const oldImagePath = path.join(process.cwd(), 'service.uploads', service.imgURL);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlink(oldImagePath, (err) => {
                        if (err) console.error("FileSystem Error:", err);
                    });
                }
            
        }
         }
    const updatedservice=service.findOneAndUpdate({name:oldname},updateddata,{new:true})
    res.status(202).json(updatedservice);}
    catch(err){
        res.status(400).json({err:err.message})
    }
}) 
router.delete('/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const serviceToDelete = await service.findOne({ name: name });

        if (!serviceToDelete) {
            return res.status(404).json({ message: 'Service not found' });
        }

    
        if (serviceToDelete.imgURl) {
            const filePath = path.join(__current_dir, 'uploads', serviceToDelete.imgURl);

            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error("Failed to delete local image:", err);
                }
            });
        }
        await service.deleteOne({ name: name });

        res.status(200).json({ message: 'Service deleted successfully' });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});
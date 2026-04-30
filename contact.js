const mongoose=require('mongoose');
const express= require('express');
const router=express.Router();

const contactschema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    message: { 
        type: String, 
        required: true 
    },
    isRead:{
        type:Boolean,required:true
    }
});

router.get('/',async(req,res)=>{
    try{
        const mycontact =await contact.find();
        res.status(200).json(mycontact)
    }
    catch(err){
     res.status(404).json({message:'error finding data'})
    }
})
router.post('/',async(req,res)=>{
    try{
    const {name,email,message}=req.body;
    const savedservice=Contact.create({name,email,message});
    res.status(201).json(savedservice);
    }
    catch(err){
        res.status(400).json(err.message)
    }
})
router.patch('/messages/:id/read', async (req, res) => {
    try {
        const updatedMessage = await Contact.findByIdAndUpdate(
            req.params.id,
            { isRead: true },
            { new: true }
        );
        res.json(updatedMessage);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
const Contact = mongoose.model('Contact', contactschema);
module.exports = Contact;
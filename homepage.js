const express=require('express');
const fs =require('fs/promises');
const path = require('path');
const router = express.Router();
const datapath = path.join(__dirname, 'home.json');
//showing home file content
router.get('/',async(req,res)=>{
try{const content =await fs.readFile(datapath, 'utf8');
const jsoncontent = JSON.parse(content);
res.status(200).send(jsoncontent)}
catch (error) {
        res.status(500).json({ message: "Error reading homepage data", error: error.message });
    }
}) 

//updating home page
router.put('/', async (req, res) => {
    try {
      
        const fileContent = await fs.readFile(datapath, 'utf8');
        const existingData = JSON.parse(fileContent); 
        
        const finalData = { ...existingData, ...req.body };

        // 3. Write back the stringified object
        await fs.writeFile(datapath, JSON.stringify(finalData, null, 2));

        res.status(200).json(finalData);
    } catch (error) {
        res.status(500).json({ message: "Error updating homepage data", error: error.message });
    }
});

module.exports =router
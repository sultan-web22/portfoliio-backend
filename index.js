const express = require('express');
const app = express();
const port = 3000;
const projects= require ('./projects')
app.use(express.json());
const mongoose = require('mongoose');

// Added the database name to the URI (e.g., /school)
mongoose.connect('mongodb://localhost:27017/projects')
    .then(() => console.log(`Database connected on port :${port}`))
    .catch(err => console.error('Connection error:', err));
    const projectroute =require ('./projects') 
    app.use('/projects',projectroute)  
    app.listen(3000,()=>{console.log(`listing on port: ${port}`)})
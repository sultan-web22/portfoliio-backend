const express = require('express');
const app = express();
const port = 3000;
const projects= require ('./projects');
const homepage = require('./homepage');
const service=require('./service');
const contact=require('./contact');
app.use(express.json());
const mongoose = require('mongoose');
app.use('/projects', project); 
app.use('/homepage', homeRoute);
app.use('/services', service); 
app.use('/contacts', contact);

mongoose.connect('mongodb://localhost:27017/projects')
    .then(() => console.log(`Database connected on port :${port}`))
    .catch(err => console.error('Connection error:', err));
    const projectroute =require ('./projects') 
    const homeroute = require ('./homepage')
   
    app.listen(3000,()=>{console.log(`listing on port: ${port}`)}) 
    
const express = require('express');
const app = express();
const mong = require('mongoose');
require('dotenv').config();
const auth = require('./Routes/auth');
const story = require('./Routes/stories');
const bodyParser = require('body-parser');
const Cors = require('cors');

app.use(Cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/api/auth',auth);
app.use('/api/stories',story);


app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).json({error:'Internal Server Error'});
})

app.listen(process.env.PORT,async()=>{
    try{
        await mong.connect(process.env.MongoDB_URL).then(()=>{
            console.log('Connected to DB');
        }).catch((err)=>console.log(err,'Couldnt connect DB'));
        console.log(`Server is running at https://localhost:${4000}`);
    }
    catch(err){
        console.log(err,'Couldnt connect to  Server');
    }
})
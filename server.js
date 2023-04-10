// side channel attack

const express = require('express');
const app = express();
const responseTime = require('response-time');
const PORT =5000;
const mongoose = require('mongoose');
require('colors');

//some db connection here
(async()=>{
    try{
        const connection =await mongoose.connect('mongodb://localhost/userD');
        if(connection.connection.readyState==1){
            console.log('connected'.yellow)
        }
    }catch(err){    
        console.log(err.message);
    }

})()

app.use(express.json('1mb'));
app.use(responseTime());

const UserSchema  = mongoose.Schema({
    username:String,
    password:String
})


const User=mongoose.model('user',UserSchema);
app.get('/',async(req,res)=>{
    res.json({message:"Ok.."})
})
app.post('/',async(req,res)=>{
    try{
        const {username,password} = req.body;
    const data=await User.findOne({username:username});
    console.log(data)
    if(data){

        setTimeout(() => {
            if(data.password===password){
                res.json(data);        
            }else{
                res.json({message:"username or password doesnot match"});
            }
        }, 500);
    }else{
        res.json({message:"username or password doesnot match"});
    }

    }catch(err){
        res.json(err.message)
    }
})



app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}/`);
})

// Mass Assignment vulnerablity

// db connection
const mongoose =  require('mongoose');
const jwt = require('jsonwebtoken');
const KEY='66a045b452102c59d840ec097d59d9467e13a3f34f6494e539ffd32c1bb35f18';
require('colors');
const PORT  =5000;
const express = require('express');
const app = express();
app.use(express.json());
(async()=>{

    const {connection}=await mongoose.connect('mongodb://localhost:27017/MassDB')
    if(connection.readyState===1){
        console.log('connected'.yellow);

    }else{
        console.log('not connected'.red)
    }
})()

const userSchema = mongoose.Schema({
    name:String,
    password:String,
    email:String,
    isAdmin:{
        type:Boolean,
        default:false
    }
})

const User = mongoose.model('users',userSchema);

app.get('/',(req,res)=>{
    res.json({message:"OK"});
})

app.post('/register',async(req,res)=>{
    const userdata   =  req.body;
    console.log(userdata)
    const data =await User(userdata);
    await data.save();
    res.json(data);
})


app.get('/')

app.listen(PORT,()=>{
    console.log('http://localhost:5000');
})

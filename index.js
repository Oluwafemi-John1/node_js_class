const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const URI = "mongodb+srv://Oluwafemi:john1998@cluster0.kn0llwr.mongodb.net/schoolportal_db2?retryWrites=true&w=majority"


mongoose.connect(URI)
.then(()=>{
    console.log("Mongoose neural handshake complete");
})
.catch((err)=>{
    console.log(err);
})

let userSchema = {
    firstname:String,
    lastname:String,
    email:String,
    password:String
}

let userModel = mongoose.model('users_collection',userSchema)

app.set("view engine", "ejs");
// app.use(express.bodyParser({urlencoded:true}));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    console.log("Route slash accessed");
    // res.send("Hello")
    // res.send([
    //     {name:"John",age:20},
    //     {name:"Doe",age:30},
    //     {name:"Jane",age:40}
    // ]);
    // console.log(__dirname);
    res.sendFile(__dirname +"/index.html");
})

app.get("/index",(req,res)=>{
    // res.send("HI Index")
    res.render("first")
})

app.get("/okay",(req,res)=>{
    res.render("femi", {name:"Ajala",school:"SQI"})
})

app.get("/signup",(req,res)=>{
    res.render("signup",{message:""})
})

app.get("/signin",(req,res)=>{
    res.render("signin")
})

app.get("/dash",(req,res)=>{
    res.render("dashboard",{name:"Idogbe",food:"Garri"})
})

app.post("/details",(req,res)=>{
    console.log(req.body);
    let form = new userModel(req.body)
    form.save()
    .then(()=>{
        console.log("database ti gba wole")
        res.render("signup",{message:"Sign up successful"})
    })
    .catch((err)=>{
        console.log(err);
        res.render("signup",{message:"Failed to submit"})
    })
})

app.listen("4670",()=>{
    console.log("Server has started on port 4670");
})
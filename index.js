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
    firstname:{type:String, required:true},
    lastname:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true}
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
    res.render("signin",{message:""})
})
app.get("/dashboard",(req,res)=>{
    userModel.find()
    .then((response)=>{
        console.log(response);
        res.render("dashboard", {userDetails: response})
    })
    .catch((err)=>{
        console.log(err);
    })
})

app.post("/signup",(req,res)=>{
    console.log(req.body);
    let form = new userModel(req.body)
    console.log(form);
    form.save()
    .then((response)=>{
        console.log("successfully saved");
        // console.log(response)
        res.redirect("/signin")
    })
    .catch((err)=>{
        console.log(err);
        if (err.code === 11000) {
            console.log(err.code);
            res.render("signup",{message:"Email already exist"})
        } else {
            res.render("signup", {message:"Please fill in all fields"})
        }
    })
})

app.post("/signin",(req,res)=>{
    userModel.find({email:req.body.email,password:req.body.password})
    .then((response)=>{
        console.log(response);
        if (response.length > 0) {
            res.redirect("dashboard")
        } else {
            res.render("signin", {message: "Incorrect details entered"})
        }
    })
    .catch((err)=>{
        console.log(err);
    })
    
})

app.post("/delete",(req,res)=>{
    // let userId = req.body.id
    userModel.deleteOne({email:req.body.userEmail})
    .then(()=>{
        res.redirect("dashboard")
        console.log("deleted one user");
    })
    .catch((err)=>{
        console.log(err);
    })
})

app.post("/edit",(req,res)=>{
    userModel.findOne({email:req.body.userEmail})
    .then((response)=>{
        console.log(response);
        res.render("editUser", {userDetails:response})
    })
})

app.post("/update", (req,res)=>{
    let id = req.body.id
    userModel.findByIdAndUpdate(id, req.body)
    .then((response)=>{
        console.log(response);
        res.redirect("dashboard")
    })
    .catch((err)=>{
        console.log(err);
    })
})

app.listen("4670",()=>{
    console.log("Server has started on port 4670");
})
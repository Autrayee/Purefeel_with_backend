/*var express  = require('express')
var bodyparser = require('body-parser')
var http = require('http')
var path = require('path')
const cors = require('cors');

var indexRouter = require('./server/controller/indexRouter')

var app = express()
app.use (bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'dist/demo_purefeel_rct')))
app.use(cors())

app.use('/webapi',indexRouter)

app.get('*', function (req, res) {
    var mypath=path.join(__dirname,'dist/demo_purefeel_rct/index.html')
    res.sendFile(mypath);
});

http.createServer(app).listen(3000,(err,result)=>{
    if(err)
        console.log(err)
    else
        console.log("Server running.....")            
})*/

var express  = require('express')
const cors = require('cors');
var mongoose=require("mongoose")

var app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/shopping", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected")
})

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = new mongoose.model("User", userSchema)

//Routes
app.post("/login", (req, res)=> {
    const { email, password} = req.body
    User.findOne({ email: email}, (err, user) => {
        if(user){
            if(password === user.password ) {
                res.send({message: "Login Successfull", user: user})
            } else {
                res.send({ message: "Password didn't match"})
            }
        } else {
            res.send({message: "User not registered"})
        }
    })
}) 

app.post("/register", (req, res)=> {
    const { name, email, password} = req.body
    User.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "User already registerd"})
        } else {
            const user = new User({
                name,
                email,
                password
            })
            user.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Registered, Please login now." })
                }
            })
        }
    })
    
}) 

app.listen(9002,() => {
    console.log("BE started at port 9002")
})
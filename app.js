var express  = require('express')
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
})
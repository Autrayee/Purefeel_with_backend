var express = require('express')
var router = express.Router()
var indexModel = require('../model/indexModel')
var jwt = require('jsonwebtoken')
var generate_random_key = require('./randomStringAPI')


router.get('/', (req, res, next) => {
    res.send('its working')
})

router.post('/usersignup', (req, res, next) => {
    var collection_name = "newusers"
    indexModel.usersignup(collection_name, req.body).then((result) => {
        //sendMail(req.body)
        res.json({ 'response': 'success' })
    }).catch((err) => {
        res.json({ 'response': 'failed' })
    })
})

router.post('/userlogin', (req, res, next) => {
    var collection_name = "newusers"
    indexModel.userlogin(collection_name, req.body).then((result) => {
    /*res.json({ 'response': 'success' })
    }).catch((err) => {
        res.json({ 'response': 'failed' })
    })*/
    var flag
    if(result.length==0)
    {
        flag=0
        res.json({response:flag})
    }
    else
    {
        flag=1
        var playload = {subject:result[0]._id}
        var token = jwt.sign(playload,generate_random_key(50))
        res.json({response:flag,token:token,user:result[0]})
    }
}).catch((err)=>{
    console.log(err)
})     
    
})

module.exports = router
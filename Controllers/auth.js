const express = require('express')
const router = express()
const jwt = require('jsonwebtoken')
const secrets = require('../Model/secretsModel.js')


let secret
let refreshSecret

secrets.findAll({
    raw:true,
    attributes:["accessSecret", "refreshSecret"]
}).then(data => {
    secret = data[0].accessSecret
    refreshSecret = data[0].refreshSecret
})


function createToken(username){
    return jwt.sign({username}, secret,{expiresIn: "10000s"})
}

function createRefreshToken(username){
    return jwt.sign({username}, refreshSecret)
}

function checkToken(req, res, next){
    let auth = req.headers['auth']
    let token = auth && auth.split(' ')[1]

    if(token == null){
        res.status(401).send('no token sent')
    }

    jwt.verify(token,secret,(err,username) => {
        if(err){
            res.status(403).send('wrong token')
        }
        else {
            req.user = {}
            req.user.username = username
            next()
        }
    })
}
function refreshSecretCode(){
    return refreshSecret
}

module.exports = {
    createRefreshToken,
    createToken,
    checkToken,
    refreshSecretCode
}
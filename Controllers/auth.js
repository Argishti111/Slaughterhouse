const express = require('express')
const router = express()
const jwt = require('jsonwebtoken')
const conn = require('./connectionManager.js')


let secret
let refreshSecret

conn.pool().connect((err, client, done) => {
    if(err){
        res.send(err)
    }

    client.query('select * from "Argisht"."secrets"')
        .then(result => {
            return result.rows
        })
        .then(data => {
            secret = data[0].accessSecret
            refreshSecret = data[0].refreshSecret
        })
        .catch(err => {
            res.status(500).send(err)
        })
        .finally(() => {
            done()
        })
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
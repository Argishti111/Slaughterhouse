const express = require('express')
const router = express()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('./auth.js')
const conn = require('./connectionManager.js')

router.use(express.json())


router.post('/', (req,res) => {
    let {username, password} = req.body

    conn.pool().connect((err, client, done) => {
        if (err) {
            res.send(err)
        }
    client.query('Select * from "Argisht"."users" where username = $1', [username])
        .then(result => {
            return result.rows
        })
        .then(data => {
            if (data.length === 0) {
                res.status(401).send('cannot find user')
            } else {
                bcrypt.compare(password,data[0].password)
                    .then(authBool => {
                        if(authBool){
                            let refreshToken = auth.createRefreshToken(req.body.username)
                            let token = auth.createToken(req.body.username)
                            res.status(200).send(JSON.stringify({token,username: data[0].username,refreshToken}))
                            //redirect to home page
                        }
                        else {
                            res.status(403).send('wrong password')
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).send('login not complete')
                    })
            }
        })
        .catch(err => {
            res.status(500).send(err)
        })
        .finally(() => {
            done()
        })
})

})

router.post('/token', (req, res) => {

    const refreshToken = req.body.refreshToken
    const refreshSecret = auth.refreshSecretCode()

    if(!refreshToken){
        res.send('no refresh token')
    }


    jwt.verify(refreshToken, refreshSecret, (err, username) =>{
        if(err){
            res.send('wrong refresh token')
        } else {
            let token = auth.createToken(username)
            res.send(token)
        }
    })
})

module.exports = router
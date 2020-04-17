const express = require('express')
const router = express()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('./auth.js')
const User = require('../Model/usersModel.js')

router.use(express.json())


router.post('/', async (req,res) => {
    let {username, password} = req.body

    let users = await User.findAll(
        {
            raw: true,
            where: {
                username: username
            }
        })
    bcrypt.compare(password, users[0].password)
        .then(authBool => {
            if (authBool) {
                let refreshToken = auth.createRefreshToken(req.body.username)
                let token = auth.createToken(req.body.username)
                res.status(200).send(JSON.stringify({token, username: users[0].username, refreshToken}))
                //redirect to home page
            } else {
                res.status(403).send('wrong password')
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).send('login not complete')
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
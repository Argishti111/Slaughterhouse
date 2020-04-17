const express = require('express')
const router = express()
const bcrypt = require('bcrypt')
const User = require('../Model/usersModel.js')

router.use(express.json())

router.post('/', (req, res)=> {
    let {username, password} = req.body
    bcrypt.hash(password,10)
        .then(data => {
            User.create({
                    username: username,
                    password: data
                },
                {
                    fields: ["username","password"]
                }
            ).then(() => {
                res.send("ok")
            }).catch((err) => {
                res.send(err)
            })
        })
        .catch(err => {
            res.send(err)
        })
})



module.exports = router

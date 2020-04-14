const express = require('express')
const router = express()
const bcrypt = require('bcrypt')
const conn = require('./connectionManager.js')

router.use(express.json())

router.post('/',(req, res)=> {
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
                if (data.length !== 0) {
                    res.status(409).send("username is already registered")
                } else {
                    bcrypt.hash(password, 10)
                        .then(data => {

                            req.body.password = data

                            client.query('insert into "Argisht"."users" values(default, $1, $2)', [req.body.username, req.body.password])
                                .then(result => {
                                    return result.rows
                                })
                                .then(data => {
                                    res.status(200).send("success")
                                })
                                .catch(err => {
                                    res.status(500).send(err)
                                })
                        })
                        .catch(err => {
                            res.status(500).send('sign up not complete')
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



module.exports = router

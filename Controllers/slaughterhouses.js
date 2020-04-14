const express = require('express')
const router = express()
const auth = require('./auth.js')
const conn = require('./connectionManager.js')


router.use(express.json())

router.get('/',auth.checkToken, (req, res) => {
    conn.pool().connect((err, client, done) => {
        if(err) {
            res.send(err)
        }
        client.query('Select * from "Argisht"."slaughterhouses"')
            .then(result => {
                return result.rows
            })
            .then(data => {
                res.status(200).send(data)
            })
            .catch(err => {
                res.status(500).send(err)
            })
            .finally(() => {
                done()
            })
    })
})

router.post('/',auth.checkToken, (req, res) => {
    conn.pool().connect((err, client, done) => {
        if(err) {
            res.send(err)
        }
        client.query('insert into "Argisht"."slaughterhouses" values(default, $1)',[req.body.name])
            .then(result => {
                return result.rows
            })
            .then(data => {
                res.status(200).send("success")
            })
            .catch(err => {
                res.status(500).send(err)
            })
            .finally(() => {
                done()
            })
    })
})

router.delete('/:id',auth.checkToken, (req, res) => {
    conn.pool().connect((err, client, done) => {
        if(err) {
            res.send(err)
        }
        client.query('delete from "Argisht"."slaughterhouses" where id = ' + req.params.id)
            .then(result => {
                return result.rows
            })
            .then(data => {
                res.status(200).send("success")
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
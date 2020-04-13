const express = require('express')
const router = express()
const {Pool} = require('pg')
require('dotenv').config()



let connectionString = process.env.postgresconnect

const pool = new Pool({
    connectionString,
    ssl: true
})

router.use(express.json())

router.get('/', (req, res) => {
    pool.connect((err, client, done) => {
        if(err) {
            res.send(err)
        }
        client.query('Select * from "Argisht"."farmers"')
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

router.post('/', (req, res) => {
    pool.connect((err, client, done) => {
        if(err) {
            res.send(err)
        }
        client.query('insert into "Argisht"."farmers" values(default, $1)',[req.body.name])
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

router.delete('/:id', (req, res) => {
    pool.connect((err, client, done) => {
        if(err) {
            res.send(err)
        }
        client.query('delete from "Argisht"."farmers" where id = ' + req.params.id)
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
const express = require('express')
const router = express()
const conn = require('./connectionManager.js')
const auth = require('./auth.js')

router.use(express.json())



router.get('/',auth.checkToken,  (req, res) => {
    conn.pool().connect((err, client, done) => {
        if (err) {
            res.send(err)
        }
        client.query('Select * from "Argisht"."users"')
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

// router.post('/', (req, res) => {
//
//     pool.connect((err, client, done) => {
//         if(err) {
//             res.send(err)
//         }
//         client.query('insert into "Argisht"."users" values(default, $1, $2)',[req.body.name,req.body.password])
//             .then(result => {
//                 return result.rows
//             })
//             .then(data => {
//                 res.status(200).send("success")
//             })
//             .catch(err => {
//                 res.status(500).send(err)
//             })
//             .finally(() => {
//                 done()
//             })
//     })
// })

router.delete('/:id',auth.checkToken, (req, res) => {
    conn.pool().connect((err, client, done) => {
        if(err) {
            res.send(err)
        }
        client.query('delete from "Argisht"."users" where id = ' + req.params.id)
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
const express = require('express')
const router = express()
const auth = require('./auth.js')
const Slaughterhouse = require('../Model/slaughterhousesModel.js')


router.use(express.json())

router.get('/',auth.checkToken, (req, res) => {
    Slaughterhouse.findAll({raw: true})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.send(err)
        })
})

router.post('/',auth.checkToken, (req, res) => {
    Slaughterhouse.create({
        name: req.body.name
    },{
        fields: ["name"]
    })
        .then(data => {
            res.send("success")
        })
        .catch(err => {
            res.send(err)
        })
})

router.delete('/:id',auth.checkToken, (req, res) => {
    Slaughterhouse.destroy({
        where:{
            id: req.params.id
        }
    })
        .then(data => {
            res.send('success')
        })
        .catch(err => {
            res.send(err)
        })
})

module.exports = router
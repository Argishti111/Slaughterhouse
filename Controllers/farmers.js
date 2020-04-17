const express = require('express')
const router = express()
const auth = require('./auth.js')
const Farmer = require('../Model/farmersModel.js')


router.use(express.json())

router.get('/',auth.checkToken, (req, res) => {
    Farmer.findAll({raw: true})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.send(err)
        })
    })

router.post('/',auth.checkToken, (req, res) => {
    Farmer.create({
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
    Farmer.destroy({
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
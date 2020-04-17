const express = require('express')
const router = express()
const User = require('../Model/usersModel.js')
 const auth = require('./auth.js')


router.use(express.json())


router.get('/',auth.checkToken,  async (req, res) => {
    let users = await User.findAll({raw: true})
    res.send(users)
})


router.delete('/:id',auth.checkToken,  async (req, res) => {
    User.destroy(
        {
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            res.send('ok')
        })
        .catch(err => {
            res.send(err)
        })
})

module.exports = router
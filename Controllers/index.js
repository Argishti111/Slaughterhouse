const express = require('express')
const router = express()

router.use('/users', require('./users'))

router.use('/slaughterhouses', require('./slaughterhouses'))

router.use('/farmers', require('./farmers'))

module.exports = router
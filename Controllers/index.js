const express = require('express')
const router = express()

router.use('/users', require('./users'))

router.use('/slaughterhouses', require('./slaughterhouses'))

router.use('/farmers', require('./farmers'))

router.use('/signup', require('./signup'))

router.use('/login', require('./login'))

module.exports = router
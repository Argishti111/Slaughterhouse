const express = require('express')
const app = express()
global.Sequelize = require('sequelize')
global.sequelize = new Sequelize(
    "NodeExample", "locallogin", "123456",
    {
        dialect: "mssql",
        host: "localhost",
        port: "2020",
        dialectOptions: {
            encrypt: true
        }
    }
)





app.use('/api', require('./Controllers'))

app.get('/', (req, res) => {
    res.send('Hello')
})

app.listen(3000)
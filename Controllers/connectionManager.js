const express = require('express')
const router = express()
const {Pool} = require('pg')
require('dotenv').config()


function pool() {

    let connectionString = process.env.postgresconnect

   return  new Pool({
        connectionString,
        ssl: true
    })
}

module.exports = {pool}
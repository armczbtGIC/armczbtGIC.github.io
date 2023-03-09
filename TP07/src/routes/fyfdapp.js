const express = require('express')
const fyfdRouter = express.Router()

fyfdRouter.get('', async(req,res) => {
  res.render('fyfdapp')
})

module.exports = fyfdRouter
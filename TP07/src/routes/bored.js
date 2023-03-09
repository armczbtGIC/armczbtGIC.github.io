const express = require('express')
const boredRouter = express.Router()

boredRouter.get('', async(req,res) => {
  res.render('bored')
})

module.exports = boredRouter
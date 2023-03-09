const express = require('express')
const clockRouter = express.Router()

clockRouter.get('', async(req,res) => {
  res.render('clock')
})

module.exports = clockRouter
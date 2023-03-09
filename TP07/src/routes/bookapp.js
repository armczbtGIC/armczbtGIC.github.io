const express = require('express')
const bookRouter = express.Router()

bookRouter.get('', async(req,res) => {
  res.render('bookapp')
})

module.exports = bookRouter
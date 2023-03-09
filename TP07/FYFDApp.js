const express = require('express')
const app = express()
const port = 2305

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/js', express.static(__dirname + 'public/js'))

app.set('views', './src/views')
app.set('view engine', 'ejs')


const fyfdRouter = require('./src/routes/fyfdapp')

app.use('/', fyfdRouter)


app.listen(port, () => console.log('FYFD APP is now running on port '+port+' !'));
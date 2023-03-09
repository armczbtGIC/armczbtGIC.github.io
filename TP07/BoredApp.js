const express = require('express')
const app = express()
const port = 2304

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/js', express.static(__dirname + 'public/js'))

app.set('views', './src/views')
app.set('view engine', 'ejs')


const boredRouter = require('./src/routes/bored')

app.use('/', boredRouter)


app.listen(port, () => console.log('Bored APP is now running on port '+port+' !'));
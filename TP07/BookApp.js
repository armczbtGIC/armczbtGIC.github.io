const express = require('express')
const app = express()
const port = 2306

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/js', express.static(__dirname + 'public/js'))

app.set('views', './src/views')
app.set('view engine', 'ejs')


const bookRouter = require('./src/routes/bookapp')

app.use('/', bookRouter)


app.listen(port, () => console.log('Book APP is now running on port '+port+' !'));
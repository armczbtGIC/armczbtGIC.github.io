const express = require('express')
const app = express()
const port = 2307

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/js', express.static(__dirname + 'public/js'))

app.set('views', './src/views')
app.set('view engine', 'ejs')


const clockRouter = require('./src/routes/clock')

app.use('/', clockRouter)


app.listen(port, () => console.log('Clock is now running on port '+port+' !'));
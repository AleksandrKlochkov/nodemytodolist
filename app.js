const express = require('express')
const path = require('path')
const app = express()


const todoRoutes = require('./routes/todo')

app.use(express.static(path.join(__dirname, 'client/public')))
app.use(express.json())

app.use('/api/todo', todoRoutes)

app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(
        __dirname, 'client', 'public', 'index.html'
      )
    )
})

module.exports = app
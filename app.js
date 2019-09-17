const express = require('express')
const path = require('path')
const graphqlHTTP = require('express-graphql')
const resolver = require('./graphql/resolver')
const schema = require('./graphql/schema')
const app = express()

//const todoRoutes = require('./routes/todo')

app.use(express.static(path.join(__dirname, 'client/public')))
app.use(express.json())

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolver,
  graphiql: true,
}));
//app.use('/api/todo', todoRoutes)

app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(
        __dirname, 'client', 'public', 'index.html'
      )
    )
})

module.exports = app
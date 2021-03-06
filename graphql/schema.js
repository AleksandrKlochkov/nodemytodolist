const {buildSchema} = require('graphql')

module.exports = buildSchema(`
  type User {
    name: String!
    email: String!
    age: Int!
  }

  type TestType {
    count: Int!
    users: [User!]!
  }

  input UserInput {
    name: String!
    email: String!
  }

  type Todo {
    id: ID!
    title: String!
    done: Boolean!
    createdAt: String
    updatedAt: String
  }

  type Query {
    random(min: Int!, max: Int!, count: Int!): [Float!]!,
    getTodos: [Todo!]!
  }

  input TodoInput{
    title: String!
  }

  type Mutation {
    createTodo(todo: TodoInput!): Todo!
    completedTodo(id: ID!): Todo!
    removeTodo(id: ID!): Boolean!
  }
`)
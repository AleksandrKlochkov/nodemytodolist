const TodoModel = require('../models/todo')

  
  module.exports = {
    async getTodos() {
        try{
            return await TodoModel.findAll()
        }catch(e){
            throw new Error('Fetch todos is not available')
        }
    },
    async createTodo({todo}) {
        try{
           return await TodoModel.create({
                title: todo.title,
                done: false
            })
        }catch(e){
            throw new Error('Title is required')
        }
    }, 
    async completedTodo({id, done}) {
        try{
            const todo = await TodoModel.findByPk(id)
            todo.done = done
            await todo.save()
            return todo
        }catch(e){
            throw new Error('Id is required')
        }
    },
    async removeTodo({id}) {
        try{
            const todos = await TodoModel.findAll({
                where: {id}
            })
            await todos[0].destroy()
            return true
        }catch(e){
            throw new Error('Id is required')
            return false
        }
    }
  }
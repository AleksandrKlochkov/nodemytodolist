const {Router} = require('express')
const router = Router()

const TodoModel = require('../models/todo')

// Получение списка задач
router.get('/', (req,res) => {
    try{
        res.status(200).json({
            message: 'GET'
        })
    }catch(e){
        console.log(e)
        res.status(500).json({
            message: 'Server error'
        })
    }
})

// Создание новой задачи
router.post('/', async (req,res) => {
    console.log(req.body)
    // try{
    //     const todo = await TodoModel.create({
    //         title: req.body.title,
    //         done: false
    //     })
    
    //     res.status(201).json({todo})
    // }catch(e){
    //     console.log(e)
    //     res.status(500).json({
    //         message: 'Server error'
    //     })
    // }
})

// Изменение задачи
router.put('/:id', (req,res) => {
    try{

    }catch(e){
        console.log(e)
        res.status(500).json({
            message: 'Server error'
        })
    }
})

// Удаление задачи
router.delete('/:id', (req,res) => {
    try{

    }catch(e){
        console.log(e)
        res.status(500).json({
            message: 'Server error'
        })
    }
})

module.exports = router
import axios from 'axios'
import moment from 'moment'

import {FETCH_TODOS_START, FETCH_TODOS_SUCCESS, FETCH_TODOS_ERROR, CREATE_TODO_TASK, CREATE_TODO_ERROR, COMPLETED_TODO_SUCCESS, COMPLETED_TODO_ERROR, REMOVE_TODO_SUCCESS, REMOVE_TODO_ERROR} from '../actions/actionTypes'

moment.updateLocale('ru',  
    {
        longDateFormat : {
        LLL : 'D MMMM YYYY, HH:mm:ss',
        LL : 'D MMMM YYYY',
    }, 
    months: ['Января' , 'Февраля' , 'Марта' , 'Апреля' , 'Мая' , 'Июня' , 'Июля' , 'Августа' , 'Сентября' , 'Октября' , 'Ноября' , 'Декабря' ]
}) 

export function fetchTodos() {
    return async dispatch => {
        dispatch(fetchTodosStart())
        const taskList = []

        const query = `
                query {
                    getTodos{
                    id title done createdAt updatedAt
                    }
                }
            `
        try{
            await axios({
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                    },
                url: '/graphql',
                data: JSON.stringify({query})
            })
            .then((response) => {
                const todos = response.data.data.getTodos
                if(todos.length>0){
                    todos.map((item)=>{
                            item.createdAt = moment(+item.createdAt).format('LLL')
                            item.updatedAt = moment(+item.updatedAt).format('LLL')
                            taskList.push(item)      
                        })
                        return dispatch(fetchTodosSuccess(taskList))
                    }else{
                        return dispatch(fetchTodosSuccess(taskList))
                    }
                })
                .catch((error) => {
                    console.log(error)
                });
        }catch(e){
            dispatch(fetchTodosError(e))
        }
    }
       
}


export function fetchTodosStart(){
    return {
        type: FETCH_TODOS_START
    }
}

export function fetchTodosSuccess(taskList){
    return {
        type: FETCH_TODOS_SUCCESS,
        taskList
    }
}

export function fetchTodosError(error){
    return {
        type: FETCH_TODOS_ERROR,
        error
    }
}

export function createTodo(title){
    return async dispatch => {
                    const query = `
                        mutation {
                            createTodo(todo: {title: "${title}"}) {
                            title
                            id
                            createdAt
                            updatedAt
                            }
                        }
                    `
                    try{
                        axios({
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                                },
                            url: '/graphql',
                            data: JSON.stringify({query})
                        })
                        .then(response=>{
                            const createItemTodo =  response.data.data.createTodo
                                createItemTodo.updatedAt = moment(+createItemTodo.updatedAt).format('LLL')
                                createItemTodo.createdAt = moment(+createItemTodo.createdAt).format('LLL')
                                dispatch(createTodoTask(createItemTodo))
                            })
                        .catch(e=>console.log(e))
                    }catch(e){
                        dispatch(createTodoError(e))
                    } 
                
    }
}

export function createTodoTask(item, inputsOptions) {
    return {
        type: CREATE_TODO_TASK,item
    }
}

export function createTodoError(error) {
    return {
        type: CREATE_TODO_ERROR,error
    }
}

export function completedTodo(elem){
    return async dispatch => {
        const id = elem.target.dataset.id
        const eventChecked = elem.target.checked
            if(id){
                const query = `
                    mutation {
                        completedTodo(id: "${id}"){
                            id updatedAt done
                        }
                    }
                `
                try{
                    await axios({
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                                },
                            url: '/graphql',
                            data: JSON.stringify({query})
                            })
                            .then(response => {
                                const todoItemTodo = response.data.data.completedTodo
                                if(todoItemTodo){
                                    if(eventChecked){
                                        todoItemTodo.updatedAt = moment(+todoItemTodo.updatedAt).format('LLL')
                                        dispatch(completedTodoSuccess(todoItemTodo))
                                    }else{
                                        todoItemTodo.updatedAt = moment(+todoItemTodo.updatedAt).format('LLL')
                                        dispatch(completedTodoSuccess(todoItemTodo))
                                    }
                                       
                                }
                            })
                            .catch(e=>console.log(e))
            }catch(e){
               dispatch(completedTodoError(e))
            } 
        }
    }
}

export function completedTodoSuccess(item){
    return {
        type: COMPLETED_TODO_SUCCESS, item

    }
}

export function completedTodoError(error){
    return {
        type: COMPLETED_TODO_ERROR, error
    }
}

export function removeTodo(id){
    return async dispatch => {
            const query = `
                            mutation {
                                removeTodo(id: "${id}")
                            }
                        `
            try{
                await axios({
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    url: '/graphql',
                    data: JSON.stringify({query})
                    })
                    .then(() => {
                        dispatch(removeTodoSuccess(id))
                    
                    })
                    .catch(e=> dispatch(removeTodoError(e)))
            }catch(e){
                    dispatch(removeTodoError(e))
            } 
    }
}

export function removeTodoSuccess(id) {
    return {
        type: REMOVE_TODO_SUCCESS, id
    }
}

export function removeTodoError(error) {
    return {
        type: REMOVE_TODO_ERROR, error
    }
}


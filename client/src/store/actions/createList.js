import axios from 'axios'
import moment from 'moment'

import {FETCH_TODOS_START, FETCH_TODOS_SUCCESS, FETCH_TODOS_ERROR} from '../actions/actionTypes'

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
                      return dispatch(fetchTodosSuccess(taskList))
                    })

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
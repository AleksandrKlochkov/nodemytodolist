import React, { Component } from "react"
import './CreateList.css'
import moment from 'moment'
import axios from 'axios'
import {connect} from 'react-redux'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Checkbox from '../../components/UI/Checkbox/Checkbox'
import Loader from '../../components/UI/Loader/Loader'
import {fetchTodos} from '../../store/actions/createList'


moment.updateLocale('ru',  
    {
        longDateFormat : {
        LLL : 'D MMMM YYYY, HH:mm:ss',
        LL : 'D MMMM YYYY',
    }, 
    months: ['Января' , 'Февраля' , 'Марта' , 'Апреля' , 'Мая' , 'Июня' , 'Июля' , 'Августа' , 'Сентября' , 'Октября' , 'Ноября' , 'Декабря' ]
}) 

class CreateList extends Component {

    markTaskHandler = async (event) => {
        const taskList = this.state.taskList
        const id = event.target.dataset.id
        const taskIndex = taskList.findIndex((task => task.id === id));
        const eventChecked = event.target.checked
        const done = taskList[taskIndex].done
            if(id){
                const query = `
                    mutation {
                        completedTodo(id: "${id}", done: ${!done}){
                            updatedAt
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
                                        taskList[taskIndex].updatedAt = moment(+todoItemTodo.updatedAt).format('LLL')
                                        taskList[taskIndex].done = !done
                                        this.setState({
                                            taskList
                                        })
                                    }else{
                                        taskList[taskIndex].updatedAt = moment(+todoItemTodo.updatedAt).format('LLL')
                                        taskList[taskIndex].done = false
                                        this.setState({
                                            taskList
                                        })
                                    }
                                       
                                }
                            })
                            .catch(e=>console.log(e))
            }catch(e){
                console.log(e)
            } 
        }
    }

    onSubmitHandler = async (event) => {
       event.preventDefault()
       const form = event.target.querySelectorAll('input')
       const inputsOptions = this.state.inputsOptions
       const taskList = this.state.taskList.slice(0)

       form.forEach((item)=> {
           if(item.value.length>0){           
            inputsOptions.isInvalid = true
            const title = item.value.trim()
                if(title){
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
                                taskList.push(createItemTodo)
                                this.setState({
                                    taskList,
                                    inputsOptions
                                })
                            })
                        .catch(e=>console.log(e))
                    }catch(e){
                        console.log(e)
                    } 
                
                }
           }else{
               inputsOptions.isInvalid = false
               this.setState({
                inputsOptions
               })
               return 
           }   
       })

       form.forEach((item)=> {
            item.value = ''
       })
    }

    deleteItemTask = async (event) => {
        event.preventDefault()
        const taskList = this.state.taskList
        const id = event.target.dataset.id
        if(taskList.length>0){
            if(id){
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
                                this.setState({
                                    taskList: taskList.filter((task) => task.id !== id)
                                })
                              
                            })
                            .catch(e=>console.log(e))
                }catch(e){
                    console.log(e)
                } 
            }

        }
    }

    renderYourTask(){
        const taskList = this.props.taskList
                if(taskList.length>0){
                    return taskList.sort((a,b)=>{
                        if(a.updatedAt<b.updatedAt){
                            return 1
                        }else if(a.updatedAt>b.updatedAt){
                            return -1
                        }
                            return 0
                   }).map((item, idx)=>{
                                return(
                                    <tr key={idx}>
                                        <td style={{width : 25}}>
                                            <Checkbox itemDone={item.done ? true : false} idx={idx} id={item.id} onChange={(event)=>this.markTaskHandler(event)}/>
                                        </td>
                                        <td>
                                            <p className={item.done ? 'сross-out' : ''} style={{fontWeight: 'bold'}}>{item.title}</p>
                                            <p style={{fontWeight: 300}}>Добавлено {item.createdAt} <small>(изменено {item.updatedAt})</small></p>
                                        </td>
                                        <td style={{textAlign : 'right'}}>
                                            <div className="mi-close-box">
                                                <i onClick={(event)=>this.deleteItemTask(event)} data-index={idx} data-id={item.id} className="large material-icons">close</i>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                          }     
          
    }
    
    componentDidMount(){
        this.props.fetchTodos()
       
    }

    render(){
        return(
            <div className={'CreateList'}>
                <h1>Создать список дел</h1>
                <div className="row task-row">
                    <p className="task-date">{moment().format('LL')}</p>
                    <p className="task-counter">Кол-во задач: {this.props.taskList.length}</p>
                </div>
               
                <div className="row">
                    <form onSubmit={(event)=>this.onSubmitHandler(event)}>
                        <div className="row">
                            <Input
                                label={'Введите название задачи'}
                                name={'name'}
                                isValid={this.props.inputsOptions.isInvalid}
                            />
                        </div>
                        <div className="row">
                            <Button type="submit">Добавить</Button>
                        </div>
                    </form>
                </div>
                {this.props.loading ? <Loader /> :
                  <div className="row">
                        <h2>Ваши задачи</h2>
                        {this.props.taskList.length > 0 ?
                                <table>
                                    <tbody>
                                        {this.renderYourTask()}
                                    </tbody>
                                </table>
                        : 
                            <p>У Вас нет задач</p>
                        }
                   </div>
                }
                  
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        taskList: state.create.taskList,
        inputsOptions: state.create.inputsOptions,
        loading: state.create.loading
    }
}

function mapDispatchToProps(dispatch){
    return {
        fetchTodos: () => dispatch(fetchTodos())
        }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateList)
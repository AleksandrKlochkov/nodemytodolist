import React, { Component } from "react"
import './CreateList.css'
import moment from 'moment'
import axios from 'axios'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Checkbox from '../../components/UI/Checkbox/Checkbox'

moment.updateLocale('ru',  
    {
        longDateFormat : {
        LLL : 'D MMMM YYYY, HH:mm:ss',
        LL : 'D MMMM YYYY',
    }, 
    months: ['Января' , 'Февраля' , 'Марта' , 'Апреля' , 'Мая' , 'Июня' , 'Июля' , 'Августа' , 'Сентября' , 'Октября' , 'Ноября' , 'Декабря' ]
}) 

class CreateList extends Component {

    state = {
        taskList: [],
        inputsOptions : {
            isInvalid: true
        }
    }

    markTaskHandler = async (event) => {
        const taskList = this.state.taskList
        const id = event.target.dataset.id
        const taskIndex = taskList.findIndex((task => task.id === +id));
        const eventChecked = event.target.checked
        const done = taskList[taskIndex].done
            if(id){
                try{
                    await axios({
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            url: '/api/todo/'+id,
                            data: JSON.stringify({done: !done})
                            })
                            .then(response => {
                                if(response.data.todo){
                                    if(eventChecked){
                                        response.data.todo.updatedAt = moment(response.data.todo.updatedA).format('LLL')
                                        response.data.todo.createdAt = moment(response.data.todo.createdAt).format('LLL')

                                        taskList.splice(taskIndex, 1, response.data.todo)
                                        this.setState({
                                            taskList
                                        })
                                    }else{
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
                    try{
                        axios({
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            url: '/api/todo',
                            data: JSON.stringify({title})
                        })
                    .then(response=>{
                            response.data.todo.updatedAt = moment(response.data.todo.updatedA).format('LLL')
                            response.data.todo.createdAt = moment(response.data.todo.createdAt).format('LLL')
                            taskList.unshift(response.data.todo)
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
                try{
                    await axios({
                            method: 'delete',
                            headers: { 'Content-Type': 'application/json' },
                            url: '/api/todo/'+id
                            })
                            .then(() => {
                                this.setState({
                                    taskList: taskList.filter((task) => task.id !== +id)
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
        const taskList = this.state.taskList
                if(taskList.length>0){
                    return taskList.map((item, idx)=>{
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
    
    
    async componentDidMount(){
        const taskList = this.state.taskList
            try{
                await  axios.get('/api/todo')
                .then((response) => {
                   response.data.sort((a,b)=>{
                        if(a.updatedAt<b.updatedAt){
                            return 1
                        }else if(a.updatedAt>b.updatedAt){
                            return -1
                        }
                            return 0
                        
                      
                   }).map((item)=>{
                        item.createdAt = moment(item.createdAt).format('LLL')
                        item.updatedAt = moment(item.updatedAt).format('LLL')
                        taskList.push(item)
                        this.setState({
                            taskList
                        })
                        return ''
                    })
                })
                .catch((error) => {
                    console.log(error)
                });
    
            }catch(e){
                console.log(e)
            }
    }

    render(){
        return(
            <div className={'CreateList'}>
                <h1>Создать список дел</h1>
                <div className="row task-row">
                    <p className="task-date">{moment().format('LL')}</p>
                    <p className="task-counter">Кол-во задач: {this.state.taskList.length}</p>
                </div>
               
                <div className="row">
                    <form onSubmit={(event)=>this.onSubmitHandler(event)}>
                        <div className="row">
                            <Input
                                label={'Введите название задачи'}
                                name={'name'}
                                isValid={this.state.inputsOptions.isInvalid}
                            />
                        </div>
                        <div className="row">
                            <Button type="submit">Добавить</Button>
                        </div>
                    </form>
                </div>
                {this.state.taskList.length > 0 ?
                    <div className="row">
                        <h2>Ваши задачи</h2>
                        <table>
                            <tbody>
                                {this.renderYourTask()}
                            </tbody>
                        </table>
                    </div>
                : 
                    <p>У Вас нет задач</p>
                }
                  
            </div>
        )
    }
}

export default CreateList
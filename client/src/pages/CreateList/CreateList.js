import React, { Component } from "react"
import './CreateList.css'
import moment from 'moment'

import Input from '../../components/UI/Input/Input'
import Checkbox from '../../components/UI/Checkbox/Checkbox'
import Button from '../../components/UI/Button/Button'
import axios from 'axios'

moment.updateLocale('ru',  
    {
        longDateFormat : {
        LL : 'D MMMM YYYY',
    }, 
    months: ['Январь' , 'Февраль' , 'Март' , 'Апрель' , 'Май' , 'Июнь' , 'Июль' , 'Август' , 'Сентябрь' , 'Октябрь' , 'Ноябрь' , 'Декабрь' ]
}) 

class CreateList extends Component {

    state = {
        taskList: [],
        inputsOptions : {
            isInvalid: true
        }
    }

    markTaskHandler = (event) => {
        const index = event.target.dataset.index
        const taskList = this.state.taskList
        if(index){
            if(event.target.checked){
                taskList[index].done = true
                this.setState({
                    taskList
                })
            }else{
                taskList[index].done = false
                this.setState({
                    taskList
                })
            }
        }

    }

    async sendTaskToDb(itemTaskList){
        console.log(itemTaskList)
        try{
            await axios.post('/api/todo/',{
                    title: itemTaskList.task,
                    done: itemTaskList.done
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        }catch(e){
            console.log(e)
        }
       
    }

    onSubmitHandler = (event) =>{
       event.preventDefault()
       const form = event.target.querySelectorAll('input')
       const inputsOptions = this.state.inputsOptions
       let itemTaskList = {}
       const taskList = this.state.taskList
     
       const todaysDate = moment().format('LL')

       form.forEach((item)=> {
           if(item.value.length>0){
            itemTaskList = {task:item.value, date: todaysDate.toString(), done: false}
            taskList.push(itemTaskList)
            inputsOptions.isInvalid = true
            if(itemTaskList){
                this.sendTaskToDb(itemTaskList)
            }
           }else{
               inputsOptions.isInvalid = false
               this.setState({
                inputsOptions
               })
           }   
       })
     
       this.setState({
        taskList,
        inputsOptions
       })

       form.forEach((item)=> {
            item.value = ''
       })
    }

    
   

    deleteItemTask = (event) => {
        event.preventDefault()
        const index = event.target.dataset.index
        const taskList = this.state.taskList
        taskList.splice(index,1)
        this.setState({
            taskList
        })
    }

    
    taskListCompilation = () => {
     return this.state.taskList.map((item, index)=>{
         let idx = index
         return(
            <tr key={index}>
                <td style={{width : 25}}>
                    <Checkbox itemDone={item.done} idx={idx} markTaskHandler={(event)=>this.markTaskHandler(event)}/>
                </td>
                <td>
                    <p className={item.done ? 'сross-out' : ''} style={{fontWeight: 'bold'}}>{item.task}</p>
                    <p className={item.done ? 'сross-out' : ''} style={{fontWeight: 500}}>Добавлено {item.date}</p>
                </td>
                <td style={{textAlign : 'right'}}>
                    <div className="mi-close-box">
                        <i onClick={(event)=>this.deleteItemTask(event)} data-index={idx} className="large material-icons">close</i>
                    </div>
                </td>
            </tr>
         )
      })

    
    }

    
    async componentDidMount(){
            try{
                await  axios.get('/api/todo')
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
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
                {
                    this.state.taskList.length > 0 
                    ? 
                        <div className="row">
                            <h2>Ваши задачи</h2>
                            <table>
                                <tbody>
                                    {this.taskListCompilation()}
                                </tbody>
                            </table>
                        </div>
                    : 
                    <p>У Вас пока нет задач</p>
                    }
                  
            </div>
        )
    }
}

export default CreateList
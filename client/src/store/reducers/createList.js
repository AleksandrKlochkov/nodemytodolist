import {FETCH_TODOS_START, FETCH_TODOS_SUCCESS, FETCH_TODOS_ERROR, CREATE_TODO_TASK, CREATE_TODO_ERROR,COMPLETED_TODO_SUCCESS,COMPLETED_TODO_ERROR, REMOVE_TODO_SUCCESS, REMOVE_TODO_ERROR} from '../actions/actionTypes'

const initialState = {
    taskList: [],
    loading: false,
    error: null
}

export default function createReducer(state=initialState, action) {
    let taskIndex = ''
    switch(action.type){
        case FETCH_TODOS_START:
            return {
                ...state, loading: true
            } 
        case FETCH_TODOS_SUCCESS:
            return {
                ...state, loading: false, taskList: action.taskList
            } 
        case FETCH_TODOS_ERROR:
            return {
                ...state, loading: false, error: action.error
            } 
        case CREATE_TODO_TASK:
            return {
                ...state,
                taskList: [...state.taskList, action.item]
            } 
        case CREATE_TODO_ERROR:
            return {
                ...state, error: action.error   
            }
        case COMPLETED_TODO_SUCCESS:
            taskIndex = state.taskList.findIndex(task => task.id === action.item.id)
            state.taskList[taskIndex].done = action.item.done
            state.taskList[taskIndex].updatedAt = action.item.updatedAt
            return {
                ...state, taskList: [...state.taskList]
            }
        case COMPLETED_TODO_ERROR:
            return {
                ...state, error: action.error
            }
        case REMOVE_TODO_SUCCESS: 
             taskIndex = state.taskList.findIndex(task => task.id === action.id)
             state.taskList.splice(taskIndex,1)
            return{
                ...state, taskList: [...state.taskList]
            }
        case REMOVE_TODO_ERROR: 
            return  {
                ...state, error: action.error
            }
        default:
            return state
    }

}
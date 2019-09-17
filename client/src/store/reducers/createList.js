import {FETCH_TODOS_START, FETCH_TODOS_SUCCESS, FETCH_TODOS_ERROR} from '../actions/actionTypes'

const initialState = {
    taskList: [],
    inputsOptions : {
        isInvalid: true
    },
    loading: false,
    error: null
}

export default function createReducer(state=initialState, action) {
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
        default:
            return state
    }

}
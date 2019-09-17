import {combineReducers} from 'redux'
import createReducer from './createList'

export default combineReducers({
    create: createReducer
})
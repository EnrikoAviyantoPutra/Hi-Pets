import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import chatReducer from './reducers/chatReducer'
import doctorReducer from './reducers/doctorReducer'

const rootReducer = combineReducers({
  chatReducer,
  doctorReducer
})

let store = createStore(rootReducer, applyMiddleware(thunk));

export default store
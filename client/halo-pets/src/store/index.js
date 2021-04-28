import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import adoptionReducer from './reducers/adoptionReducer'
import userReducer from './reducers/userReducer'
import chatReducer from './reducers/chatReducer'
import doctorReducer from './reducers/doctorReducer'
import favoriteReducer from './reducers/favoriteReducer'

const rootReducer = combineReducers({
  userReducer,
  adoptionReducer,
  chatReducer,
  doctorReducer,
  favoriteReducer
})

let store = createStore(rootReducer, applyMiddleware(thunk));
console.log(store.getState());

export default store
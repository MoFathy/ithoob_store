import { createStore, applyMiddleware } from 'redux'
// import thunkMiddleware from 'redux-thunk'

import thunk from 'redux-thunk';
import rootReducer from './reducers/index'
import logger from 'redux-logger'

const middelware = [thunk]
export function initializeStore (initialState) {
    let final_middleware;
if (process.env.NODE_ENV !== 'production') {
    // if development let action appear in console.log
    // final_middleware = applyMiddleware(thunkMiddleware,logger);
    final_middleware = applyMiddleware(...middelware,logger);
  }else{
    // if production
    final_middleware = applyMiddleware(...middelware);
  }
  return createStore(
    rootReducer,
    initialState,
    final_middleware
  )
}

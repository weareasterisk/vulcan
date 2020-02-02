import { applyMiddleware, combineReducers, compose, createStore, Store } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import authReducer from "./authReducer"

export default function configureStore(initState = {}): Store {
  const reducer = combineReducers({ auth: authReducer })

  const enhancements = [composeWithDevTools(applyMiddleware(thunk))]

  return createStore(reducer, initState, compose(...enhancements))
}

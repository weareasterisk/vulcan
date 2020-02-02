import { applyMiddleware, combineReducers, compose, createStore } from "redux"
import saveState from "redux-localstorage"
import thunk from "redux-thunk"

export default function configureStore(initState = {}) {
  const reducer = combineReducers({})

  const enhancements = [
    applyMiddleware(thunk),
    saveState(null, {
      slicer: () => state => ({}),
    }),
  ]

  if (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancements.push(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  }

  return createStore(reducer, initState, compose(...enhancements))
}

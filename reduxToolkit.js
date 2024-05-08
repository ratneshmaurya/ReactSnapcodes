// --------------First create a Slice file(reducer name.js) in a folder naming features----------------------

import { createSlice } from '@reduxjs/toolkit'
import React from 'react'

const initialState={
    value:1,
};

//must use the key name as name, initialState, reducers, else we get errors
// Creating a slice requires a string name to identify the slice, an initial state value, and 
// one or more reducer functions to define how the state can be updated.

const counterSlice=createSlice({
    name:'counter',
    initialState,
    reducers:{
        increment:(state,action)=>{
            //to access the state value inside the slice we have to write <whole store access>.<state variable name>
            state.value= state.value+1;
        },
        decrement:(state,action)=>{
            state.value= state.value-1;
        }
    }
})

export const {increment, decrement}= counterSlice.actions;
export default counterSlice.reducer




// ----------------------------------------------------------------------------------------------------
// ------------------------------ now create a store.js file in a folder naimg store ------------------

import { configureStore } from '@reduxjs/toolkit'
import valueReducer from '../features/valueReducer'

//configure store must take an object containing the reducer object that takes 
//each slices in <string name to identify the slice>:<reducer export name> formats
export const store = configureStore({
    reducer: {
        counter:valueReducer,
    },
})
export default store



// --------------------------------------------------------------------------------------------------------------------
// -------------------------- now use the store using useSelector() and useDispatch() hooks from react-----------------

import './App.css'
import {useDispatch, useSelector} from "react-redux"
import { increment, decrement } from './features/valueReducer';

function App() {

  //to access the state value outside the slice we have to write 
  //<whole store access i.e state>.<string name to identify the slice, i.e value of the name variable inside slice>.<state variable name>
  const counterValue = useSelector((state) => state.counter.value);

  const dispatch=useDispatch();

  return (
    <>
      <h1>Counter value is {counterValue}</h1>
      <button onClick={()=>dispatch(increment())}>+</button>
      <button onClick={()=>dispatch(decrement())}>-</button>
    </>
  )
}

export default App




// -------------------------------------------------------------------------------------------------
// --------------------------now wrap the app.js in the provider of redux in index.jsx(or main.jsx file)----
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  </React.StrictMode>,
)

import React, { useEffect } from "react"


import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Home from "./Pages/Home"
import AdminPanel from "./Pages/AdminPanel "

import Alert from "./components/alert/Alert";
import { useSelector, useDispatch } from "react-redux"
import { refreshToken } from "./redux/actions/authActions"
import { getServices } from "./redux/actions/serviceActions"

import { Routes, Route } from 'react-router-dom';



function App() {

  const { auth, service } = useSelector(state => state)
  const dispatch = useDispatch()

 

  useEffect(() => {
    dispatch(refreshToken())
    if(auth.token){
      localStorage.setItem("auth", auth.token)
    }
  }, [])

 



  return (

    <div className="App">
      <Alert />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/adminPanel' element={<AdminPanel />} />
      </Routes>

    </div>

  );
}

export default App;

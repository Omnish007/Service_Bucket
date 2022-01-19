import React, { useEffect } from "react"


import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Home from "./Pages/Home"
import AdminPanel from "./Pages/AdminPanel "

import Alert from "./components/alert/Alert";
import { useSelector, useDispatch } from "react-redux"
import { refreshToken } from "./redux/actions/authActions"

import { Routes, Route } from 'react-router-dom';


function App() {

  const { auth, services } = useSelector(state => state)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(refreshToken())
  }, [dispatch])

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

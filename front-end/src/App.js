import React, { useEffect } from "react"


import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Home from "./Pages/Home"
import AdminPanel from "./Pages/AdminPanel "
import Service from "./Pages/Service"

import Alert from "./components/alert/Alert";
import { useSelector, useDispatch } from "react-redux"
import { refreshToken } from "./redux/actions/authActions"

import { Routes, Route } from 'react-router-dom';
import Profile from "./Pages/Profile"
import PrivateRouter from "./components/Private Router/PrivateRouter"
import PageRender from "./components/Private Router/PageRender"



function App() {

  const { auth, service } = useSelector(state => state)
  const dispatch = useDispatch()



  useEffect(() => {
    dispatch(refreshToken())
    if (auth.token) {
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
        <Route path='/service' element={< Service />} />
        <Route path='/profile' element={< Profile />} />
        <Route exact path='/:page/:id' element={< PageRender />} />
      </Routes>

    </div>

  );
}

export default App;

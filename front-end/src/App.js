import { useEffect } from "react"

import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Home from "./Pages/Home"
import AdminPanel from "./Pages/AdminPanel "

import Alert from "./components/alert/Alert";
import { useSelector, useDispatch } from "react-redux"
import { refreshToken } from "./redux/actions/authActions"

import { Routes, Route } from 'react-router-dom';


function App() {

  const { auth } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(refreshToken())
  }, [dispatch])

  return (

    <div className="App">
      <Alert />
      <Routes>
        <Route exact path='/' element={< Home />}></Route>
      </Routes>
      <Routes>
        <Route exact path='/register' element={< Register />}></Route>
      </Routes>
      <Routes>
        <Route exact path='/login' element={< Login />}></Route>
      </Routes>
      <Routes>
        <Route exact path='/adminPanel' element={< AdminPanel />}></Route>
      </Routes>
      
    </div>

  );
}

export default App;

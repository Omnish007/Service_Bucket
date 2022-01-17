import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Home from "./Pages/Home"

import Alert from "./components/alert/Alert";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';


function App() {
  return (
    <Router>

      <Alert />

      <div className="App">
        <Routes>
          <Route exact path='/' element={< Home />}></Route>
        </Routes>
        <Routes>
          <Route exact path='/register' element={< Register />}></Route>
        </Routes>
        <Routes>
          <Route exact path='/login' element={< Login />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

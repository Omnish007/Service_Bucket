import React, { useEffect } from "react";

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import AdminPanel from "./Pages/AdminPanel ";
import Service from "./Pages/Service";

import Alert from "./components/Alert/Alert";
import { useSelector, useDispatch } from "react-redux";
import { refreshToken } from "./redux/actions/authActions";
import { refreshTokenForEmployee } from "./redux/actions/employeeAction";

import { Routes, Route, useNavigate } from "react-router-dom";
import Profile from "./Pages/Profile";
import PageRender from "./components/Private Router/PageRender";
import NotFound from "./components/NotFound";
import ActivateEmployeeEmail from "./components/Register/ActivateEmployeeEmail";

function App() {
    const { auth, service } = useSelector((state) => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(refreshToken());
        dispatch(refreshTokenForEmployee());
        // if (auth.token) {
        //     localStorage.setItem("auth", auth.token);
        // }
    }, []);

    return (
        <div className="App">
            <Alert />
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/adminPanel" element={<AdminPanel />} />
                <Route path="/service" element={<Service />} />
                <Route path="/profile" element={<Profile />} />
                <Route exact path="/" element={<Home />} />
                <Route
                    path="/employee/activate/:activation_token"
                    element={<ActivateEmployeeEmail />}
                    exact
                />

                <Route path="/:page/:id" element={<PageRender />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;

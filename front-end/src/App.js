import React, { useEffect } from "react";

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import AdminPanel from "./Pages/AdminPanel ";
import Service from "./Pages/Service";

import Alert from "./components/alert/Alert";
import { useSelector, useDispatch } from "react-redux";
import { refreshToken } from "./redux/actions/authActions";

import { Routes, Route, useNavigate } from "react-router-dom";
import Profile from "./Pages/Profile";
import PageRender from "./components/Private Router/PageRender";
import NotFound from "./components/NotFound";
import AdminRoute from "./components/Private Router/AdminRoutes";

function App() {
    const { auth, service } = useSelector((state) => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(refreshToken());
        if (auth.token) {
            localStorage.setItem("auth", auth.token);
        }
    }, []);

    return (
        <div className="App">
            <Alert />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/service" element={<Service />} />

                <Route path="/profile" element={<Profile />} />

                <Route path="/:page/:id" element={<PageRender />} />

                <Route element={<AdminRoute auth={auth} />}>
                    <Route path="/adminPanel/*" element={<AdminPanel />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import "../CSS/Register.css";
import Navbar from "../components/Navbar";

import UserRegister from "../components/Register/UserRegister";
import EmployeeRegister from "../components/Register/EmployeeRegister";

const Register = () => {
    const { auth, alert } = useSelector((state) => state);
    const navigate = useNavigate();
    const [selectRegisterType, setSelectRegisterType] = useState("User");

    useEffect(() => {
        if (auth.token) navigate(`/`);
    }, [auth.token, navigate]);

    return (
        <div className="regisrer_page_container">
            <Navbar />
            <button onClick={() => setSelectRegisterType("User")}>
                User Register
            </button>
            <button onClick={() => setSelectRegisterType("Employee")}>
                Employee Register
            </button>
            <div className="main_container">
                <div className="form_container">
                    {selectRegisterType === "User" && (
                        <UserRegister auth={auth} alert={alert} />
                    )}

                    {selectRegisterType === "Employee" && (
                        <EmployeeRegister auth={auth} alert={alert} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Register;

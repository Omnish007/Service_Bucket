import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/Login.css";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

import { useSelector } from "react-redux";
import UserLogin from "../components/Login/UserLogin";
import EmployeeLogin from "../components/Login/EmployeeLogin";

const Login = () => {
    const { auth } = useSelector((state) => state);
    const [selectLoginType, setSelectLoginType] = useState("User");

    // const [typePass, setTypePass] = useState(false)

    return (
        <>
            <div className="login_page_container">
                <Navbar />
                <button onClick={() => setSelectLoginType("User")}>User</button>
                <button onClick={() => setSelectLoginType("Employee")}>
                    Employee
                </button>

                {selectLoginType === "User" && <UserLogin auth={auth} />}

                {selectLoginType === "Employee" && (
                    <EmployeeLogin auth={auth} />
                )}
                <Footer />
            </div>
        </>
    );
};

export default Login;

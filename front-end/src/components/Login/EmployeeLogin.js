import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginEmployee } from "../../redux/actions/employeeAction";

const EmployeeLogin = ({ auth }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const initialState = { email: "", password: "" };
    const [userData, setUserData] = useState(initialState);
    const { email, password } = userData;

    useEffect(() => {
        if (auth.token) navigate(`/`);
    }, [auth.token, navigate]);

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginEmployee(userData));
    };

    return (
        <div>
            <div className="main_container">
                <div className="form_container">
                    <h1>Employee Login</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="input_container">
                            <label htmlFor="Email">Email</label>
                            <input
                                type="email"
                                placeholder="Enter Your Email"
                                onChange={handleChangeInput}
                                value={email}
                                name="email"
                            />
                        </div>
                        <div className="input_container">
                            <label htmlFor="Password">Password</label>
                            <input
                                type="password"
                                placeholder="Enter Your Password"
                                onChange={handleChangeInput}
                                value={password}
                                name="password"
                            />
                        </div>
                        <div className="input_container">
                            <button
                                disabled={email && password ? false : true}
                                className="submit_btn"
                            >
                                Login
                            </button>
                        </div>

                        <p>
                            Don't Have an account?{" "}
                            <Link to="/register">Register</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EmployeeLogin;

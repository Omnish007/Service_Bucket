import React from "react";
import { Link } from "react-router-dom";
import "../CSS/navbar.css";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/authActions";

const Navbar = () => {
    const { auth } = useSelector((state) => state);
    const dispatch = useDispatch();

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        Navbar
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/service">Service</Link>
                            </li>
                            {auth.token ? (
                                <>
                                    <li className="nav-item">
                                        <Link
                                            to="/"
                                            onClick={() => dispatch(logout())}
                                        >
                                            LogOut
                                        </Link>
                                    </li>
                                    {auth.token ? (
                                        auth.user.role !== "1" ? (
                                            <li className="nav-item">
                                                <Link to="/profile">
                                                    Profile
                                                </Link>
                                            </li>
                                        ) : (
                                            ""
                                        )
                                    ) : (
                                        ""
                                    )}
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link to="/login">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/register">Register</Link>
                                    </li>
                                </>
                            )}
                            <li className="nav-item">
                                {auth.token ? (
                                    auth.user.role === "1" ? (
                                        <Link to="/adminPanel">
                                            Admin Panel
                                        </Link>
                                    ) : (
                                        ""
                                    )
                                ) : (
                                    ""
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;

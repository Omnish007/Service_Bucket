import React, { useState, useEffect } from 'react'
import { Link, useNavigate  } from 'react-router-dom'
import "../CSS/Login.css"
import Navbar from "../components/Navbar"

import { login } from "../redux/actions/authActions"
import { useDispatch, useSelector } from "react-redux"


const Login = () => {

    const initialState = { email: "", password: "" }
    const [userData, setUserData] = useState(initialState)
    const { email, password } = userData

    // const [typePass, setTypePass] = useState(false)

    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (auth.token) navigate(`/`)
    }, [auth.token, navigate])


    const handleChangeInput = e => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(login(userData))
    }

    return (<>
    <div className="login_page_container">
        <Navbar/>
        <div className="main_container">
            <div className="form_container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input_container">
                        <label htmlFor="Email">Email</label>
                        <input type="email" placeholder='Enter Your Email' onChange={handleChangeInput}
                        value={email} name="email" />
                    </div>
                    <div className='input_container'>
                        <label htmlFor="Password">Password</label>
                        <input type="password" placeholder='Enter Your Password' onChange={handleChangeInput}
                            value={password} name="password"/>
                    </div>
                    <div className='input_container'>
                        <button disabled={email && password ? false : true} className='submit_btn'>Login</button>
                    </div>

                    <p>Don't Have an account? <Link to="/register">Register</Link></p>

                </form>
            </div>
        </div>
        </div>
        </>
    )
}

export default Login

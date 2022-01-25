import React from 'react'
import { Route, Navigate } from "react-router-dom"
import NotFound from '../NotFound'

const PrivateRouter = (props) => {

    const firstLogin = localStorage.getItem("firstLogin")

    return firstLogin ? <Route {...props} /> : "" 
}

export default PrivateRouter

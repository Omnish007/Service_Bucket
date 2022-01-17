import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

const AdminPanel = () => {

    const { auth } = useSelector(state => state)
    const navigate = useNavigate()

    useEffect(() => {
            if(!auth.token){
                navigate("/")
            }
            if(auth.user?.role !== "1"){
                navigate("/")
            }
        }, [])

    return (
        <div>
            <h1>Hello admin</h1>
        </div>
    )
}

export default AdminPanel 
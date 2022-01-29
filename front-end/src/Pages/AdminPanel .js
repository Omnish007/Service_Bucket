import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import "../CSS/AdminPage.css"
import { getServices } from '../redux/actions/serviceActions'

const AdminPanel = () => {

    const { auth, service } = useSelector(state => state)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = localStorage.getItem("auth")


    useEffect(() => {
        if(!token){
            navigate("/")
        }
        if(auth.user){
            if(token && auth.user.role !== "1"){
                navigate("/")
            }
        }
        
    }, [dispatch])
    
    const getServicesByClick = () => {
        dispatch(getServices(auth.token))
    }

    const tabs = (tabName, e) => {
        var i, tabcontent, tablinks;

        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace("active", " ");
        }

        document.getElementById(tabName).style.display = "block";
        document.getElementsByClassName(tabName).classlist += "active";

    }


    return (
        <div className="adminPage">
            <h1>Hello admin</h1>
            <div className="tab">
                <button className="tablinks tab1" onClick={() => tabs("tab1")}>Services List</button>
                <button className="tablinks tab2" onClick={() => tabs("tab2")}>Add Services</button>
            </div>
            <div id="tab1" className="tabcontent">
                <ul className="list-group">

                    
                    {
                        service.length > 0 ? service.map(ele => (
                                            <li className="list-group-item admin_serviceName" key={ele._id}>
                                                <p>{ele.name}</p>
                                                <i className="fas fa-trash"></i>
                                            </li>
                                            ))
                                        :<button className='admin_get_service_btn' onClick={getServicesByClick}>Get Service List</button>
                    }
                </ul>
            </div>

            <div id="tab2" className="tabcontent">

            </div>


        </div>
    )
}

export default AdminPanel 
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import "../CSS/AdminPage.css"
import { getServices } from '../redux/actions/serviceActions'
import { refreshToken } from '../redux/actions/authActions'
import { getAllOrders } from '../redux/actions/orderAction'

const AdminPanel = () => {

    const { auth, service, order } = useSelector(state => state)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = localStorage.getItem("auth")
    const [load, setLoad] = useState(false)


    useEffect(async () => {
        dispatch(refreshToken())
        if (auth.user) {
            if (auth.user.role === "0") {
                navigate("/")
            }
            else{
                setLoad(true)
                dispatch(getAllOrders({auth}))
                setLoad(false)
            }
        }
        else {
            navigate("/")
        }
    }, [])

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
            <div className="adminPage_serviceList">

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
                                : <button className='admin_get_service_btn' onClick={getServicesByClick}>Get Service List</button>
                        }
                    </ul>
                </div>

                <div id="tab2" className="tabcontent">

                </div>
            </div>

            <div className="adminPage_pendingReqForService">
                { 
                    console.log(order)
                    // order !== undefined && order.map(ele => (<h1>{ele}</h1>))
                }
            </div>
        </div>
    )
}

export default AdminPanel 
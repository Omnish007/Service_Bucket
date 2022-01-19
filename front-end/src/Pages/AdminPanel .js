import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getServices } from "../redux/actions/serviceActions"

import "../CSS/AdminPage.css"

const AdminPanel = () => {

    const { auth, service } = useSelector(state => state)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [services, setServices] = useState([])


    useEffect(() => {
        if (!auth.token) {
            navigate("/")
        }
        if (auth.token) {
            if (auth.user.role !== "1") {
                navigate("/")
            }
        }
    }, [])

    const gettinServiceByClick = () => {
        dispatch(getServices(auth.token))
        setServices(...services, service.service)
    }

    const tabs = (cityName, e) => {
        var i, tabcontent, tablinks;

        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace("active", " ");
        }

        document.getElementById(cityName).style.display = "block";
        document.getElementsByClassName(cityName).classlist += "active";

    }


    return (
        <div>
            <h1>Hello admin</h1>
            <div className="tab">
                <button className="tablinks tab1" onClick={() => tabs("tab1"), gettinServiceByClick}>Services List</button>
                <button className="tablinks tab2" onClick={() => tabs("tab2")}>Add Services</button>
            </div>
            <div id="tab1" className="tabcontent">
                <ul>
                    {
                        services.map(index, ele,(
                        <li>
                            {services.name}
                        </li>
                        )) 
                    }
                </ul>
            </div>

            <div id="tab2" className="tabcontent">
                <h3>Paris</h3>
                <p>Paris is the capital of France.</p>
            </div>

        </div>
    )
}

export default AdminPanel 
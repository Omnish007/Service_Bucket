/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
    createServices,
    deleteServices,
    getServices,
} from "../../redux/actions/serviceActions";

const AdminPageServiceTabs = ({ auth, service }) => {
    const dispatch = useDispatch();
    const [serviceData, setServiceData] = useState({ name: "", image: "" });

    useEffect(() => {
        dispatch(getServices(auth.token));
    }, []);

    const handleDeleteService = (id) => {
        const ans = confirm("Are you sure?");
        if (ans) {
            dispatch(deleteServices(id, auth));
        }
    };

    const handleAddService = (e) => {
        e.preventDefault();
        dispatch(createServices(serviceData, auth));
    };

    const tabs = (tabName, e) => {
        var i, tabcontent, tablinks;

        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(
                "active",
                " ",
            );
        }

        document.getElementById(tabName).style.display = "block";
        document.getElementsByClassName(tabName).classlist += "active";
    };

    return (
        <div className="adminPage">
            <div className="adminPage_serviceList">
                <div className="tab">
                    <button
                        className="tablinks tab1"
                        onClick={() => tabs("tab1")}
                    >
                        Services List
                    </button>
                    <button
                        className="tablinks tab2"
                        onClick={() => tabs("tab2")}
                    >
                        Add Services
                    </button>
                </div>
                <div id="tab1" className="tabcontent">
                    <ul className="list-group">
                        {service.length > 0
                            ? service.map((ele) => (
                                  <li
                                      className="list-group-item admin_serviceName"
                                      key={ele._id}
                                  >
                                      <p>{ele.name}</p>
                                      <i
                                          className="fas fa-trash"
                                          onClick={() =>
                                              handleDeleteService(ele._id)
                                          }
                                      ></i>
                                  </li>
                              ))
                            : ""}
                    </ul>
                </div>

                <div id="tab2" className="tabcontent">
                    <form>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name of service"
                                value={serviceData.name}
                                onChange={(e) =>
                                    setServiceData({
                                        ...serviceData,
                                        name: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Image url of service"
                                value={serviceData.image}
                                onChange={(e) =>
                                    setServiceData({
                                        ...serviceData,
                                        image: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <button
                            type="submit"
                            onClick={handleAddService}
                            className="btn btn-primary"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminPageServiceTabs;

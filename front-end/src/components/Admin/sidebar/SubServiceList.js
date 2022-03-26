/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getSubServices } from "../../../redux/actions/subServiceAction";
import {
    getSubService,
    createSubService,
    deleteSubServices,
} from "../../../redux/actions/subServiceAction";

const SubServiceList = ({ auth, subService, service }) => {
    const dispatch = useDispatch();
    const [subServiceData, setSubServiceData] = useState({
        name: "",
        image: "",
        price: "",
        serviceName: "",
    });

    useEffect(() => {
        dispatch(getSubServices(auth));
    }, []);

    const handleDeleteSubService = (data) => {
        const ans = confirm("Are you sure?");
        if (ans) {
            dispatch(deleteSubServices(data, auth));
        }
    };

    const handleAddSubService = (e) => {
        e.preventDefault();
        if (
            subServiceData.image !== "" &&
            subServiceData.name !== "" &&
            subServiceData.price !== "" &&
            subServiceData.serviceName !== ""
        ) {
            dispatch(createSubService(subServiceData, auth));
        } else {
            alert("Please fill form");
        }
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
                        SubServices List
                    </button>
                    <button
                        className="tablinks tab2"
                        onClick={() => tabs("tab2")}
                    >
                        Add SubServices
                    </button>
                </div>
                <div id="tab1" className="tabcontent">
                    <ul className="list-group">
                        {subService.length > 0
                            ? subService.map((ele) => (
                                  <li
                                      className="list-group-item admin_serviceName"
                                      key={ele._id}
                                  >
                                      <p>{ele.service.name}</p>
                                      <p>{ele.sname}</p>
                                      <i
                                          className="fas fa-trash"
                                          onClick={() =>
                                              handleDeleteSubService(ele)
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
                            {service.length > 0 && (
                                <select
                                    onChange={(e) =>
                                        setSubServiceData({
                                            ...subServiceData,
                                            serviceName: e.target.value,
                                        })
                                    }
                                >
                                    <option selected="true" value="">
                                        Service Name
                                    </option>
                                    {service.map((e, i) => (
                                        <option value={e.name}>{e.name}</option>
                                    ))}
                                </select>
                            )}
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name of subService"
                                value={subServiceData.name}
                                onChange={(e) =>
                                    setSubServiceData({
                                        ...subServiceData,
                                        name: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Image url of subService"
                                value={subServiceData.image}
                                onChange={(e) =>
                                    setSubServiceData({
                                        ...subServiceData,
                                        image: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Price of subService"
                                value={subServiceData.price}
                                onChange={(e) =>
                                    setSubServiceData({
                                        ...subServiceData,
                                        price: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <button
                            type="submit"
                            onClick={handleAddSubService}
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

export default SubServiceList;

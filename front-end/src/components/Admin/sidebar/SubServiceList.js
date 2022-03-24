import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getSubService } from "../../../redux/actions/subServiceAction";

const SubServiceList = ({ auth, subService }) => {
    const dispatch = useDispatch();
    const [subServiceData, setSubServiceData] = useState({
        name: "",
        image: "",
        price: "",
    });

    useEffect(() => {
        dispatch(getSubService(auth));
    }, []);

    // const handleDeleteService = (id) => {
    //     const ans = confirm("Are you sure?");
    //     if (ans) {
    //         dispatch(deleteServices(id, auth));
    //     }
    // };

    // const handleAddService = (e) => {
    //     e.preventDefault();
    //     dispatch(createServices(serviceData, auth));
    // };

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
                                          //   onClick={() =>
                                          //   handleDeleteService(ele._id)
                                          //   }
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
                                placeholder="Image url of service"
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
                                placeholder="Image url of service"
                                value={subServiceData.image}
                                onChange={(e) =>
                                    setSubServiceData({
                                        ...subServiceData,
                                        image: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <button
                            type="submit"
                            // onClick={handleAddService}
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

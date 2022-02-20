import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getServices } from "../../redux/actions/serviceActions";

const AdminPageServiceTabs = ({ auth, service }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getServices(auth.token));
    }, []);

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
                                      <i className="fas fa-trash"></i>
                                  </li>
                              ))
                            : ""}
                    </ul>
                </div>

                <div id="tab2" className="tabcontent"></div>
            </div>
        </div>
    );
};

export default AdminPageServiceTabs;

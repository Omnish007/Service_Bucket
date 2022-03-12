import React, { useEffect, useState } from "react";
import {
    Route,
    Link,
    useNavigate,
    Routes,
    useLocation,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "../CSS/AdminPage.css";
import { getAllOrders } from "../redux/actions/orderAction";
import Navbar from "../components/Navbar";
import Foorer from "../components/footer";
import AdminPageAddEmployeeForm from "../components/Admin/sidebar/AdminPageAddEmployeeForm";
import ServiceList from "../components/Admin/sidebar/ServiceList";
import OrderCards from "../components/Admin/sidebar/OrderCards";
import Pagination from "../components/Admin/sidebar/Pagination";
import SideBarHome from "../components/Admin/sidebar/SideBarHome";
import { getServices } from "../redux/actions/serviceActions";

const AdminPanel = () => {
    const { auth, service, order } = useSelector((state) => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [load, setLoad] = useState(false);
    const loc = useLocation();
    let pageUrl = loc.pathname.split("/adminPanel/");

    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(3);

    useEffect(() => {
        for (
            let i = 0;
            i < document.querySelectorAll(".adminPageSideBar li").length;
            i++
        ) {
            document
                .querySelectorAll(".adminPageSideBar li")
                [i].classList.remove("active");
        }
        if (pageUrl.includes("serviceList")) {
            document
                .getElementById("adminServiceList")
                .classList.toggle("active");
        }
        if (pageUrl.includes("addEmployee")) {
            document
                .getElementById("adminAddEmployee")
                .classList.toggle("active");
        }
        if (pageUrl.includes("orderCard")) {
            document
                .getElementById("adminOrderCard")
                .classList.toggle("active");
        }
    }, [loc]);

    useEffect(() => {
        const getOrder = async () => {
            setLoad(true);
            dispatch(getAllOrders({ auth }));
            dispatch(getServices());
            setLoad(false);
        };

        getOrder();
    }, [auth]);

    // change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastOrder = currentPage * ordersPerPage; // lstO = 1 * 5 = 10
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage; // fiO = 10 - 5 = 5
    const currentOrder =
        order.length > 0 && order.slice(indexOfFirstOrder, indexOfLastOrder); //curO = (5,2)

    return (
        <>
            <Navbar />
            <div className="adminPageSideBarContainer">
                <div className="adminPageSideBar">
                    <ul>
                        <li id="adminServiceList">
                            <Link to="serviceList">Service List</Link>
                        </li>
                        <li id="adminAddEmployee">
                            <Link to="addEmployee">Add Employee</Link>
                        </li>
                        <li id="adminOrderCard">
                            <Link to="orderCard">Order Cards</Link>
                        </li>
                    </ul>
                </div>
                <div className="adminPageSideBarContent">
                    <Routes>
                        <Route exact path="/" element={<SideBarHome />} />
                        <Route
                            exact
                            path="serviceList"
                            element={
                                <ServiceList auth={auth} service={service} />
                            }
                        />
                        <Route
                            exact
                            path="addEmployee"
                            element={<AdminPageAddEmployeeForm />}
                        />
                        <Route
                            exact
                            path="orderCard"
                            element={
                                <>
                                    <OrderCards
                                        order={currentOrder}
                                        auth={auth}
                                    />
                                    <Pagination
                                        orderPerPage={ordersPerPage}
                                        totalOrder={order.length}
                                        paginate={paginate}
                                        currentPage={currentPage}
                                    />
                                </>
                            }
                        />
                    </Routes>
                </div>
            </div>
            <Foorer />
        </>
    );
};

export default AdminPanel;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "../CSS/AdminPage.css";
import { getServices } from "../redux/actions/serviceActions";
import { refreshToken } from "../redux/actions/authActions";
import { getAllOrders } from "../redux/actions/orderAction";
import moment from "moment";
import AdminPendingServiceCard from "../components/Admin/AdminPendingServiceCard";
import Navbar from "../components/Navbar";
import Foorer from "../components/footer";
import AdminPageServiceTabs from "../components/Admin/AdminPageServiceTabs";
import AdminPageAddEmployeeForm from "../components/Admin/AdminPageAddEmployeeForm";
import AdminPageEmployeeList from "../components/Admin/AdminPageEmployeeList";

const AdminPanel = () => {
    const { auth, service, order } = useSelector((state) => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [load, setLoad] = useState(false);

    useEffect(async () => {
        // dispatch(refreshToken());
        if (await auth.user) {
            if ((await auth.user.role) === "0") {
                navigate("/");
            } else {
                setLoad(true);
                dispatch(getAllOrders({ auth }));
                setLoad(false);
            }
        }
        // } else {
        //     navigate("/");
        // }
    }, [auth]);

    return (
        <>
            <Navbar />
            <AdminPageServiceTabs auth={auth} service={service} />

            <div className="adminPage_pendingReqForService">
                {order.length >= 0 &&
                    order.map((ele) => (
                        <AdminPendingServiceCard key={ele._id} ele={ele} />
                    ))}
            </div>

            {/* <AdminPageAddEmployeeForm /> */}
            <AdminPageEmployeeList />
            <Foorer />
        </>
    );
};

export default AdminPanel;

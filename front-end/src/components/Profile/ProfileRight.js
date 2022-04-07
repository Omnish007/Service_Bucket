import React, { useEffect } from "react";
import HistoryImage from "../../images/History.png";
import PendingImage from "../../images/Pending.png";
import ProfileCard from "./profileCard";

import {
    getOrders,
    deleteOrder,
    orderCompleted
} from "../../redux/actions/orderAction";
import { useDispatch, useSelector } from "react-redux";

const ProfileRight = () => {
    var history = 0;
    var pending = 0;
    const { auth, order } = useSelector((state) => state);
    const dispatch = useDispatch();

    var tabButtons = document.querySelectorAll(".buttonContainer button");
    var tabPanels = document.querySelectorAll(".tabcontent");

    useEffect(() => {
        auth?.token && dispatch(getOrders({ auth }));
    }, []);

    function showPanel(panelIndex, colorCode) {
        tabButtons.forEach(function (node) {
            node.style.backgroundColor = "";
            node.style.color = "";
        });
        tabButtons[panelIndex].style.backgroundColor = colorCode;

        tabPanels.forEach(function (node) {
            node.style.display = "none";
        });
        tabPanels[panelIndex].style.display = "block";
    }

    const del = (id) => {
        if (window.confirm("Press a button!"))
            dispatch(deleteOrder({ id, auth }));
        dispatch(getOrders({ auth }));
    };

    const completedOrder = (id, employee) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("Are you sure?")) {
            dispatch(orderCompleted({ id, employee }, auth));
        }
    };

    return (
        <div className="profile_right">
            <div>
                <div className="buttonContainer">
                    <button
                        className="tablinks tab1"
                        onClick={() => showPanel(0, "#2a2a2a")}
                    >
                        Pending Services
                    </button>
                    <button
                        className="tablinks tab2"
                        onClick={() => showPanel(1, "#2a2a2a")}
                    >
                        History
                    </button>
                </div>
                <div
                    id="tab1"
                    style={{ display: "block" }}
                    className="tabcontent"
                >
                    {auth?.user &&
                    auth.user.role === "0" &&
                    order.length > 0 ? (
                        <div className="profile_card_container container-fluid">
                            {order.map((ele) =>
                                ele.status === "0" ? (
                                    <React.Fragment key={ele._id}>
                                        <h1 className="hidden">
                                            {(pending = 1)}
                                        </h1>
                                        <ProfileCard
                                            id={ele._id}
                                            service={ele.service}
                                            subService={ele.subService}
                                            price={ele.price}
                                            address={ele.address}
                                            state={ele.state}
                                            pinCode={ele.pinCode}
                                            dist={ele.dist}
                                            src={ele.image}
                                            createdAt={ele.createdAt}
                                            button={true}
                                            deleteService={del}
                                            auth={auth}
                                            employee={ele?.employee}
                                        />
                                    </React.Fragment>
                                ) : (
                                    ""
                                )
                            )}
                        </div>
                    ) : (
                        ""
                    )}

                    {auth?.user &&
                    auth.user.role === "2" &&
                    order.length > 0 ? (
                        <div className="profile_card_container container-fluid">
                            {order.map(
                                (ele) =>
                                    ele.orders.length > 0 &&
                                    ele.orders.map((element) =>
                                        element.status === "0" ? (
                                            <React.Fragment key={element._id}>
                                                <h1 className="hidden">
                                                    {(pending = 1)}
                                                </h1>

                                                <ProfileCard
                                                    auth={auth}
                                                    id={element._id}
                                                    service={element.service}
                                                    subService={
                                                        element.subService
                                                    }
                                                    price={element.price}
                                                    address={element.address}
                                                    state={element.state}
                                                    pinCode={element.pinCode}
                                                    dist={element.dist}
                                                    src={element.image}
                                                    createdAt={
                                                        element.createdAt
                                                    }
                                                    button={true}
                                                    deleteService={del}
                                                    changeStatus={true}
                                                    completedOrder={
                                                        completedOrder
                                                    }
                                                    employeeName={
                                                        element.employee
                                                    }
                                                />
                                            </React.Fragment>
                                        ) : (
                                            ""
                                        )
                                    )
                            )}
                        </div>
                    ) : (
                        ""
                    )}
                    {pending === 0 && (
                        <div className="profile_pending_image_container">
                            <img
                                className="profile_pending_image"
                                src={PendingImage}
                                alt="pending"
                            />
                        </div>
                    )}
                </div>
                <div id="tab2" className="tabcontent">
                    {auth?.user &&
                    auth.user.role === "0" &&
                    order.length > 0 ? (
                        <div className="profile_card_container">
                            {order.map((ele) =>
                                ele.status === "1" ? (
                                    <>
                                        <h1 className="hidden">
                                            {(history = 1)}
                                        </h1>
                                        <ProfileCard
                                            service={ele.service}
                                            subService={ele.subService}
                                            price={ele.price}
                                            address={ele.address}
                                            state={ele.state}
                                            pinCode={ele.pinCode}
                                            dist={ele.dist}
                                            src={ele.image}
                                            createdAt={ele.createdAt}
                                            button={false}
                                        />
                                    </>
                                ) : (
                                    ""
                                )
                            )}
                        </div>
                    ) : (
                        ""
                    )}

                    {auth?.user &&
                    auth.user.role === "2" &&
                    order.length > 0 ? (
                        <div className="profile_card_container container-fluid">
                            {order.map(
                                (ele) =>
                                    ele.orders.length > 0 &&
                                    ele.orders.map((element) =>
                                        element.status === "1" ? (
                                            <React.Fragment key={element._id}>
                                                <h1 className="hidden">
                                                    {(history = 1)}
                                                </h1>
                                                <ProfileCard
                                                    auth={auth}
                                                    id={element._id}
                                                    service={element.service}
                                                    subService={
                                                        element.subService
                                                    }
                                                    price={element.price}
                                                    address={element.address}
                                                    state={element.state}
                                                    pinCode={element.pinCode}
                                                    dist={element.dist}
                                                    src={element.image}
                                                    createdAt={
                                                        element.createdAt
                                                    }
                                                    button={true}
                                                    deleteService={del}
                                                />
                                            </React.Fragment>
                                        ) : (
                                            ""
                                        )
                                    )
                            )}
                        </div>
                    ) : (
                        ""
                    )}

                    {history === 0 && (
                        <div className="profile_history_image_container">
                            <img
                                className="profile_history_image"
                                src={HistoryImage}
                                alt="history"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileRight;

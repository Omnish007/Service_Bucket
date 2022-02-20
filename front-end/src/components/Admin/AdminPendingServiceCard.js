import moment from "moment";
import React, { useEffect, useState } from "react";
import Aos from "aos";

const AdminPendingServiceCard = ({ ele }) => {
    const [modal, setModal] = useState(false);

    useEffect(() => {
        Aos.init();
    }, []);

    return (
        <>
            <div className="adminPage_pendingReqForService_card">
                <div className="adminPage_pendingReqForService_card_img">
                    <img src={ele.image} alt="" />
                </div>
                <div className="adminPage_pendingReqForService_card_info">
                    <h1>
                        {ele.user.name.split(" ").slice(0, 1).join(" ")}
                        <small>{moment(ele.createdAt).fromNow()}</small>
                    </h1>

                    <div>
                        <span className="adminPage_pendingReqForService_card_tag">
                            {ele.service}
                        </span>
                        <i class="fas fa-angle-double-right"></i>
                        <span className="adminPage_pendingReqForService_card_tag">
                            {ele.subService}
                        </span>
                    </div>

                    <p>{ele.price}</p>
                    <p>
                        <i
                            style={{
                                color: `${
                                    ele.status == "0" ? "orange" : "green"
                                }`,
                            }}
                            class="fas fa-circle"
                        ></i>{" "}
                        {ele.status === "0" ? (
                            <span style={{ color: "orange" }}>Pending</span>
                        ) : (
                            <span style={{ color: "green" }}>Completed</span>
                        )}
                    </p>
                </div>

                <div className="adminPage_pendingReqForService_card_detail_btn">
                    <i
                        onClick={() => setModal(true)}
                        title="View Detail Button"
                        class="fas fa-caret-square-right"
                    ></i>
                </div>
            </div>

            {/* Modal  */}
            {modal && (
                <div className="adminPage_pendingReqForService_modal">
                    <div
                        data-aos="zoom-in-down"
                        data-aos-duration="500"
                        className="adminPage_pendingReqForService_modal_container"
                    >
                        <h1
                            className="adminPage_pendingReqForService_modal_closeBtn"
                            onClick={() => setModal(false)}
                        >
                            &times;
                        </h1>

                        <img
                            className="adminPage_pendingReqForService_modal_userDp"
                            src={ele.user.dp}
                        />
                        <h2>{ele.user.name}</h2>
                        <div>
                            <p className="adminPage_pendingReqForService_modal_phone">
                                <i class="fas fa-phone-alt"></i>
                                <span>{ele.user.phone}</span>
                            </p>
                            <p className="adminPage_pendingReqForService_modal_email">
                                <i class="fas fa-envelope"></i>
                                <span>{ele.user.email}</span>
                            </p>
                        </div>
                        <div>
                            <span className="adminPage_pendingReqForService_card_tag">
                                {ele.service}
                            </span>
                            <i class="fas fa-angle-double-right"></i>
                            <span className="adminPage_pendingReqForService_card_tag">
                                {ele.subService}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AdminPendingServiceCard;

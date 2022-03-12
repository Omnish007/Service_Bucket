import moment from "moment";
import React, { useEffect, useState } from "react";
import Aos from "aos";
import AdminPageServiceDetailModal from "./modal/AdminPageServiceDetailModal";

const AdminPendingServiceCard = ({ ele }) => {
    const [modal, setModal] = useState(false);

    useEffect(() => {
        Aos.init();
    }, []);

    return (
        <>
            <div className="adminPage_pendingReqForService_card ">
                <div className="adminPage_pendingReqForService_card_img">
                    <img className="img-responsive" src={ele.image} alt="" />
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
                        <i className="fas fa-angle-double-right"></i>
                        <span className="adminPage_pendingReqForService_card_tag">
                            {ele.subService}
                        </span>
                    </div>

                    <p className="adminPage_pendingReqForService_card_price">
                        {ele.price}
                    </p>

                    <p>
                        <i
                            style={{
                                color: `${
                                    ele.status === "0" ? "orange" : "green"
                                }`,
                            }}
                            className="fas fa-circle"
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
                        className="fas fa-caret-square-right"
                    ></i>
                </div>
            </div>

            {/* Modal  */}
            <AdminPageServiceDetailModal
                ele={ele}
                setModal={setModal}
                modal={modal}
            />
        </>
    );
};

export default AdminPendingServiceCard;

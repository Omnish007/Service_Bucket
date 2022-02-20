import React from "react";

const AdminPageServiceDetailModalBody = ({ ele }) => {
    return (
        <div className="adminPage_pendingReqForService_modal_body">
            <div className="adminPage_pendingReqForService_card_tag_container">
                <span className="adminPage_pendingReqForService_card_tag">
                    {ele.service}
                </span>
                <i class="fas fa-angle-double-right"></i>
                <span className="adminPage_pendingReqForService_card_tag">
                    {ele.subService}
                </span>
            </div>

            <select name="" id=""></select>

            <p>
                <i
                    style={{
                        color: `${ele.status == "0" ? "orange" : "green"}`,
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
    );
};

export default AdminPageServiceDetailModalBody;

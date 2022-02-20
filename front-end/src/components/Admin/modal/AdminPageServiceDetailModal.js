import React, { useState } from "react";
import AdminPageServiceDetailModalBody from "./AdminPageServiceDetailModalBody";
import AdminPageServiceDetailModalHeader from "./AdminPageServiceDetailModalHeader";

const AdminPageServiceDetailModal = ({ ele, setModal, modal }) => {
    return (
        <div>
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

                        <AdminPageServiceDetailModalHeader ele={ele} />
                        <AdminPageServiceDetailModalBody ele={ele} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPageServiceDetailModal;

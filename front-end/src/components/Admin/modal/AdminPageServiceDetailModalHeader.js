import React from "react";

const AdminPageServiceDetailModalHeader = ({ ele }) => {
    return (
        <div className="adminPage_pendingReqForService_modal_header">
            <img
                className="adminPage_pendingReqForService_modal_userDp"
                src={ele.user.dp}
            />
            <div className="adminPage_pendingReqForService_modal_header_content">
                <h2>{ele.user.name}</h2>
                <div className="adminPage_pendingReqForService_modal_phoneEmail_container">
                    <p className="adminPage_pendingReqForService_modal_phoneEmail adminPage_pendingReqForService_modal_phone">
                        <i className="fas fa-phone-alt"></i>
                        <span>{ele.user.phone}</span>
                    </p>

                    <p className="adminPage_pendingReqForService_modal_phoneEmail adminPage_pendingReqForService_modal_email">
                        <i className="fas fa-envelope"></i>
                        <span>{ele.user.email}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminPageServiceDetailModalHeader;

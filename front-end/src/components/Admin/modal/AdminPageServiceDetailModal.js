import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees } from "../../../redux/actions/employeeAction";
import AdminPageServiceDetailModalBody from "./AdminPageServiceDetailModalBody";
import AdminPageServiceDetailModalHeader from "./AdminPageServiceDetailModalHeader";

const AdminPageServiceDetailModal = ({ ele, setModal, modal }) => {
    const { employee, auth } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEmployees(auth));
    }, []);

    return (
        <div>
            {modal && (
                <div
                    className="adminPage_pendingReqForService_modal"
                    onClick={() => setModal(false)}
                >
                    <div
                        data-aos="zoom-in-down"
                        data-aos-duration="500"
                        className="adminPage_pendingReqForService_modal_container"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h1
                            className="adminPage_pendingReqForService_modal_closeBtn"
                            onClick={() => setModal(false)}
                        >
                            &times;
                        </h1>

                        <AdminPageServiceDetailModalHeader ele={ele} />
                        <AdminPageServiceDetailModalBody
                            ele={ele}
                            employee={employee}
                            setModal={setModal}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPageServiceDetailModal;

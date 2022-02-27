import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEmployees } from "../../../redux/actions/employeeAction";

const AdminPageServiceDetailModalBody = ({ ele }) => {
    const { auth, employee } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEmployees(auth));
    }, []);

    return (
        <div className="adminPage_pendingReqForService_modal_body">
            <div className="adminPage_pendingReqForService_card_tag_container">
                <span className="adminPage_pendingReqForService_card_tag">
                    {ele.service}
                </span>
                <i className="fas fa-angle-double-right"></i>
                <span className="adminPage_pendingReqForService_card_tag">
                    {ele.subService}
                </span>
            </div>
            {ele.status === "0" ? (
                <select className="adminPageModalBodySelectEmployee">
                    <option value="select">Select Employee</option>
                    <optgroup label="Available">
                        {employee.length > 0
                            ? employee.map((element) =>
                                  element.mastery.includes(ele.service) &&
                                  element.available === "1" ? (
                                      <>
                                          <option
                                              key={element._id}
                                              value={element.name}
                                          >
                                              {element.email}
                                          </option>
                                      </>
                                  ) : (
                                      ""
                                  ),
                              )
                            : ""}
                    </optgroup>
                    <optgroup label="Not Available">
                        {employee.length > 0
                            ? employee.map((element) =>
                                  element.mastery.includes(ele.service) &&
                                  element.available === "0" ? (
                                      <option
                                          key={element._id}
                                          value={element.name}
                                          disabled
                                      >
                                          {element.email}
                                      </option>
                                  ) : (
                                      ""
                                  ),
                              )
                            : ""}
                    </optgroup>
                    <i className="adminPage_pendingReqForService_modal_body_confirm_Employee_btn fas fa-check-circle" />
                </select>
            ) : (
                ""
            )}

            <p className="adminPage_pendingReqForService_modal_body_statusPara">
                <span>Order Status is </span>
                <i
                    style={{
                        color: `${ele.status == "0" ? "orange" : "green"}`,
                    }}
                    className="fas fa-circle"
                ></i>
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

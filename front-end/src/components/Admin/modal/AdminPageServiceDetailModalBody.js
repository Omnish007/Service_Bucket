import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addOrder, getEmployees } from "../../../redux/actions/employeeAction";
import { getAllOrders } from "../../../redux/actions/orderAction";

const AdminPageServiceDetailModalBody = ({ ele }) => {
    const { auth, employee, alert } = useSelector((state) => state);
    const dispatch = useDispatch();

    const [selectEmployee, setSelectEmployee] = useState("");
    const [employeeName, setEmployeeName] = useState("");

    useEffect(() => {
        dispatch(getEmployees(auth));
        if (employee.length > 0) {
            const employeeName = employee.filter((e) => e._id === ele.employee);
            setEmployeeName(employeeName[0].name);
        }
    }, []);

    const handleConfirmEmployee = () => {
        try {
            dispatch(addOrder(ele, selectEmployee, auth));
        } catch (error) {
            console.log(error);
        }
    };

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
                <>
                    <select
                        onChange={(e) => setSelectEmployee(e.target.value)}
                        className="adminPageModalBodySelectEmployee"
                        disabled={ele.employee === undefined ? false : true}
                    >
                        <option value="select">
                            {ele.employee !== undefined
                                ? employeeName
                                : "Select Employee"}
                        </option>
                        <optgroup label="Available">
                            {employee.length > 0
                                ? employee.map((element) =>
                                      element.mastery.includes(ele.service) &&
                                      element.available === "1" ? (
                                          <>
                                              <option
                                                  key={element._id}
                                                  value={element.email}
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
                    </select>
                    {selectEmployee === "" || selectEmployee === "select" ? (
                        ""
                    ) : (
                        <i
                            className="fas fa-check-circle"
                            onClick={handleConfirmEmployee}
                        />
                    )}
                </>
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

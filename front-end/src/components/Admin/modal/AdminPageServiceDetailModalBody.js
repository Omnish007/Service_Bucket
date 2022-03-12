import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addOrder, getEmployees } from "../../../redux/actions/employeeAction";
import { getAllOrders } from "../../../redux/actions/orderAction";

const AdminPageServiceDetailModalBody = ({ ele, setModal }) => {
    const { auth, employee } = useSelector((state) => state);
    const dispatch = useDispatch();

    const [selectEmployee, setSelectEmployee] = useState("");
    const [employeeName, setEmployeeName] = useState("");
    const [remainingDHM, setRemainingDHM] = useState([]);

    const today = new Date();
    const now = today.getTime();
    const serviceDate = ele.date.split("-");
    const date = new Date(serviceDate[0], serviceDate[1] - 1, serviceDate[2]);
    const serviceMilli = date.getTime();

    useEffect(() => {
        function dhm(t) {
            var cd = 24 * 60 * 60 * 1000,
                ch = 60 * 60 * 1000,
                d = Math.floor(t / cd),
                h = Math.floor((t - d * cd) / ch),
                m = Math.round((t - d * cd - h * ch) / 60000),
                pad = function (n) {
                    return n < 10 ? "0" + n : n;
                };
            if (m === 60) {
                h++;
                m = 0;
            }
            if (h === 24) {
                d++;
                h = 0;
            }

            return [d, pad(h), pad(m)].join(":");
        }
        const remain = dhm(serviceMilli - now).split(":");

        setRemainingDHM(remain);
    }, []);

    useEffect(() => {
        if (ele?.employee !== "" && ele?.employee !== undefined) {
            const employeeName = employee.filter((e) => e._id === ele.employee);
            setEmployeeName(employeeName[0].name);
        }
        dispatch(getAllOrders({ auth }));
    }, [ele.employee]);

    const handleConfirmEmployee = () => {
        try {
            dispatch(addOrder(ele, selectEmployee, auth));
            setModal(false);
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
                    {ele.employee !== undefined && (
                        <p className="adminPageModalBodyAssignedemployee">
                            Has been assigned
                        </p>
                    )}

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

            <div className="adminPage_pendingReqForService_modal_body_remainingTime_container">
                <div>
                    <span> {remainingDHM[0] < 0 ? "00" : remainingDHM[0]}</span>
                    <p>Days</p>
                </div>
                <div>
                    <span> {remainingDHM[0] < 0 ? "00" : remainingDHM[1]}</span>
                    <p>Hrs</p>
                </div>
                <div>
                    <span> {remainingDHM[0] < 0 ? "00" : remainingDHM[2]}</span>
                    <p>Min</p>
                </div>
            </div>

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

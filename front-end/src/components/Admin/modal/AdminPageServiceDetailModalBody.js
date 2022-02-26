import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEmployees } from "../../../redux/actions/employeeAction";

const AdminPageServiceDetailModalBody = ({ ele }) => {
    // const [employeeList, setEmployeeList] = useState([]);

    const { auth, employee } = useSelector((state) => state);
    const dispatch = useDispatch();
    console.log(employee);

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
                <select name="" id="">
                    <option value="select">Select Employee</option>
                    {employee.length > 0
                        ? employee.map((element) =>
                              element.mastery.includes(ele.service) ? (
                                  <option
                                      key={element._id}
                                      value={element.name}
                                  >
                                      {element.name}
                                  </option>
                              ) : (
                                  ""
                              ),
                          )
                        : ""}
                </select>
            ) : (
                ""
            )}

            <p>
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

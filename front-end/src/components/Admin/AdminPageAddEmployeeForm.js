import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const AdminPageAddEmployeeForm = () => {
    const [checkedVal, setCheckedVal] = useState([]);
    const { service } = useSelector((state) => state);

    const handleCheck = (e) => {
        const { name, checked } = e.target;
        checked
            ? setCheckedVal([...checkedVal, name])
            : setCheckedVal(checkedVal.filter((ele) => ele !== name));
    };

    return (
        <div className="adminPageAddEmployeeContainer">
            <form className="adminPageAddEmployeeFormContainer">
                <div>
                    <div className="adminPageAddEmployeeFormcheckBoxContainer">
                        <div>
                            <input type="text" placeholder="Name" />
                        </div>
                        <div>
                            <input type="text" placeholder="Email" />
                        </div>
                        <div>
                            <input type="tel" placeholder="Phone" />
                        </div>
                        <div>
                            {service.length > 0
                                ? service.map((e) => (
                                      <label>
                                          <input
                                              type="checkbox"
                                              name={e.name}
                                              onChange={handleCheck}
                                          />
                                          <span>{e.name}</span>
                                      </label>
                                  ))
                                : ""}
                        </div>
                        <button className="btn btn-primary btn-lg">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AdminPageAddEmployeeForm;

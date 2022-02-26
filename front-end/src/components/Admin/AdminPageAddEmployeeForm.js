import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEmployees } from "../../redux/actions/employeeAction";

const AdminPageAddEmployeeForm = () => {
    const [checkedVal, setCheckedVal] = useState([]);
    const { service, auth } = useSelector((state) => state);
    const dispatch = useDispatch();
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        mastery: [],
    });

    useEffect(() => {
        setData({ ...data, mastery: checkedVal });
    }, [checkedVal]);

    const handleCheck = (e) => {
        const { name, checked } = e.target;
        checked
            ? setCheckedVal([...checkedVal, name])
            : setCheckedVal(checkedVal.filter((ele) => ele !== name));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(addEmployees(auth, data));
    };

    return (
        <div className="adminPageAddEmployeeContainer">
            <form className="adminPageAddEmployeeFormContainer">
                <div>
                    <div className="adminPageAddEmployeeFormcheckBoxContainer">
                        <div>
                            <input
                                type="text"
                                placeholder="Name"
                                value={data.name}
                                onChange={handleChange}
                                name="name"
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Email"
                                value={data.email}
                                onChange={handleChange}
                                name="email"
                            />
                        </div>
                        <div>
                            <input
                                type="tel"
                                placeholder="Phone"
                                value={data.phone}
                                onChange={handleChange}
                                name="phone"
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                value={data.password}
                                onChange={handleChange}
                                name="password"
                            />
                        </div>
                        <div>
                            {service.length > 0
                                ? service.map((e) => (
                                      <label>
                                          <input
                                              type="checkbox"
                                              name={e.name}
                                              onChange={handleCheck}
                                              value={data.mastery}
                                          />
                                          <span>{e.name}</span>
                                      </label>
                                  ))
                                : ""}
                        </div>
                        <button
                            className="btn btn-primary btn-lg"
                            onClick={handleClick}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AdminPageAddEmployeeForm;

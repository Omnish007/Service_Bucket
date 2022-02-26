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
        <div>
            <form>
                {service.length > 0
                    ? service.map((e) => (
                          <div key={e._id}>
                              <label htmlFor={e.name}>{e.name}</label>
                              <input
                                  type="checkbox"
                                  name={e.name}
                                  onChange={handleCheck}
                              />
                          </div>
                      ))
                    : ""}
            </form>
        </div>
    );
};

export default AdminPageAddEmployeeForm;

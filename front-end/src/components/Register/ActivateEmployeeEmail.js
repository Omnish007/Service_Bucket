import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { activateEmail } from "../../redux/actions/employeeAction";
import { useDispatch } from "react-redux";

const ActivateEmployeeEmail = () => {
    const { activation_token } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if (activation_token) {
            dispatch(activateEmail(activation_token));
        }
    }, [activation_token]);

    return <div></div>;
};

export default ActivateEmployeeEmail;

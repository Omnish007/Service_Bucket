import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { activateEmail } from "../../redux/actions/employeeAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ActivateEmployeeEmail = () => {
    const { activation_token } = useParams();
    const dispatch = useDispatch();
    const { alert } = useSelector((state) => state);
    const navigate = useNavigate();

    useEffect(() => {
        if (activation_token) {
            dispatch(activateEmail(activation_token));
        }
    }, [activation_token]);

    return (
        <div>
            {alert.success === "Account has been activated!" &&
                navigate("/login")}
        </div>
    );
};

export default ActivateEmployeeEmail;

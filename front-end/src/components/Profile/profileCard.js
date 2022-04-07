import React, { useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";

const ProfileCard = ({
    auth,
    id,
    service,
    subService,
    price,
    src,
    createdAt,
    button,
    deleteService,
    employee,
    changeStatus,
    completedOrder,
    employeeName
}) => {
    const dispatch = useDispatch();
    const [slider, setSlider] = useState(0);

    return (
        <div className="profile_card row">
            <div className="profile_card_image-container col-lg-5 col-md-12">
                <img className="" src={src} alt="" />
            </div>

            <div className="profile_card_info col-lg-5 col-md-8">
                <div className="profile_card_information">
                    <h1>
                        <span> Service : </span>
                        {subService}
                    </h1>
                    <h4>
                        <span> Category : </span>
                        {service}
                    </h4>
                </div>

                {button &&
                    auth &&
                    auth.user.role === "0" &&
                    employee == undefined && (
                        <button
                            className="btn btn-danger profile_card_cancle_btn"
                            onClick={() => deleteService(id)}
                        >
                            Cancle Service
                        </button>
                    )}

                {employee !== undefined && (
                    <p className="profile_card_assigned_employee">
                        Employee is assign to your order so you can't cancel
                        order
                    </p>
                )}
                {changeStatus && (
                    <div className="profile_card_confirm_button">
                        <button
                            onClick={() => completedOrder(id, employeeName)}
                        >
                            Order completed?
                        </button>
                    </div>
                )}
            </div>
            <div className="col-lg-2 col-md-4 profile_card_price_container">
                <div className="profile_card_price">
                    <p>${price}</p>
                </div>
                <p className="profile_card_moment">
                    {moment(createdAt).fromNow()}
                </p>
            </div>
        </div>
    );
};

export default ProfileCard;

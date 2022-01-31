import React from 'react';
import moment from "moment"

const profileCard = ({ id, service, subService, price, address, state, pinCode, dist, src, createdAt, button, deleteService }) => {




    return (
        <div className="profile_card">
            <div>
                <img src={src} alt="" />
            </div>

            <div className="profile_card_info">
                <div className="profile_card_information">
                    <h1><span> Service : </span>{subService}</h1>
                    <h4><span> Category : </span>{service}</h4>
                </div>
                {
                    button &&
                    <button className="btn btn-danger profile_card_cancle_btn" onClick={() => deleteService(id)}>Cancle Service</button>
                }
            </div>
            <div>
                <div className="profile_card_price">
                    <p>${price}</p>
                </div>
                <p className="profile_card_moment">{moment(createdAt).fromNow()}</p>
            </div>

        </div>
    )
};

export default profileCard;

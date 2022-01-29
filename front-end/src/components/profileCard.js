import React from 'react';

const profileCard = ({ id, service, subService, price, address, state, pinCode, dist, src, button, deleteService }) => {


    

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
            <div className="profile_card_price">
                <p><span> </span> ${price}</p>
            </div>

        </div>
    )
};

export default profileCard;

import React from 'react';

const profileCard = ({ service, subService, price, address, state, pinCode, dist, src }) => {
    return (
        <div className="profile_card">
            <div>
                <img src={src} alt="" />
            </div>

            <div className="profile_card_info">
            <p>Service Name: {service}</p>
            <p>SubService Name: {subService}</p>
            <p>Price: {price}</p>
            <p>Address: {address}</p>
            <p>State: {state}</p>
            <p>PinCode: {pinCode}</p>
            <p>Dist: {dist}</p>
            </div>
        </div>
    )
};

export default profileCard;

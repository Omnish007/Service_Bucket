import React from "react";

const Card = ({ src, name, price }) => {
    return (
        <div>
            <div className="home_card_body">
                <div>
                    <img src={src} alt="image" />
                </div>
                <div>
                    <h4>{name}</h4>
                    <h4>
                        {price ? "$" : ""}
                        {price}
                    </h4>
                </div>
            </div>
        </div>
    );
};

export default Card;

import React from 'react'
import { useNavigate } from "react-router-dom"

const Card = ({src, name}) => {
    const navigate = useNavigate()

    const cardClick = () => {
        navigate("/serviceForm")
    }


    return (
        <div>
            <div onClick={cardClick} className='home_card_body'>
                    <div>
                        <img src={src} alt='efre' />
                    </div>
                    <div>
                        <h4>{name}</h4>
                    </div>
                    
                </div>
        </div>
    )
}

export default Card

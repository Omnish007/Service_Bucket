import React from 'react'
import { useNavigate } from "react-router-dom"
import  "../../CSS/Card.css"

const Card = ({src, name, price}) => {



    return (
        <div>
            <div className='home_card_body'>
                    <div>
                        <img src={src} alt='efre' />
                    </div>
                    <div>
                        <h4>{name}</h4>
                        <h4> {price?"$":""}{price}</h4>
                    </div>
                    
                </div>
        </div>
    )
}

export default Card

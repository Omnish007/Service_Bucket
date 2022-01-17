import React from 'react'

const Card = ({src}) => {
    return (
        <div>
            <div className='home_card_body'>
                    <div>
                        <img src={src} alt='efre' />
                    </div>
                    <div>
                        <h4>Name of Service</h4>
                    </div>
                    
                </div>
        </div>
    )
}

export default Card

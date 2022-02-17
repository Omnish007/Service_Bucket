import moment from 'moment'
import React from 'react'

const AdminPendingServiceCard = ({ ele }) => {
    return (
        <div>
            <div>
                <img src={ele.image} alt="" />
            </div>
            <h1>{ele.user.name}</h1>
            <h3>{ele.user.email}</h3>
            <h3>{ele.user.phone}</h3>
            <p>{ele.address}</p>
            <p>{ele.dist}, {ele.state}</p>
            {ele.status}
            {moment(ele.createdAt).fromNow()}
        </div>
    )
}

export default AdminPendingServiceCard

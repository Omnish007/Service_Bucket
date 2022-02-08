import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshToken } from '../../redux/actions/authActions';
import EditProfile from './EditProfile';

const ProfileLeft = () => {

    const { auth, service, order } = useSelector(state => state)
    const dispatch = useDispatch()
    const [onEdit, setOnEdit] = useState(false);

    return <div className="profile_left">
        <div className="profile_image">
            <img src={auth.user?.dp} alt="" />
        </div>


        <div className="profile_info">
            <h5>Name: {auth.user?.name}</h5>
            <h5>Email: {auth.user?.email}</h5>
            <h5>Phone: {auth.user?.phone}</h5>
            <button className='btn btn-primary' onClick={() => setOnEdit(true)}>EditProfile</button>
        </div>

        {
            onEdit && <EditProfile setOnEdit={setOnEdit} />
        }



    </div>;
};

export default ProfileLeft;

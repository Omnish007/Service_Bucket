import React, { useRef } from 'react';
import { checkImage } from '../../utils/imageUploads';
import { GLOBALTYPES } from '../../redux/actions/globalType';
import { useDispatch, useSelector } from 'react-redux';

const ProfileLeft = () => {

    const { auth, service, order } = useSelector(state => state)
    const dispatch = useDispatch()
    const inputFileRef = useRef()

    const changeDp = () => {
        inputFileRef.current.click()
    }

    



    return <div className="profile_left">
        <div className="profile_image">
            <img src={auth.user?.dp} alt="" />
            <div className="profile_change_dp">
                <p onClick={changeDp}>Change</p>
            </div>
        </div>


        <div className="profile_info">
            <h5>Name: {auth.user?.name}</h5>
            <h5>Email: {auth.user?.email}</h5>
            <h5>Phone: {auth.user?.phone}</h5>

        </div>





    </div>;
};

export default ProfileLeft;

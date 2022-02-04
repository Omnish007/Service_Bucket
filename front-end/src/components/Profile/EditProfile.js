import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const EditProfile = ({ setOnEdit }) => {

    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()

    return <div className="edit_profile_container">

        <div className="edit_profile_form_container">
            <button className='btn btn-danger edit_profile_close_btn' onClick={() => setOnEdit(false)}>&times;</button>

            <div className="profile_image">
                <img src={auth.user?.dp} alt="" />
                <div className="profile_change_dp">
                    <p>Change</p>
                </div>
            </div>

            <form>
                <div className='form-group'>
                    <input className='form-' type="text" placeholder={auth.user.phone} />
                </div>
            </form>
        </div>
    </div>;
};

export default EditProfile;

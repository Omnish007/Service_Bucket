import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const ProfileLeft = () => {
    const { auth } = useSelector((state) => state);
    const dispatch = useDispatch();
    const [onEdit, setOnEdit] = useState(false);

    return (
        <div className="profile_left">
            <div className="profileLeftSidebarContainer">
                <div className="profile_image">
                    <img src={auth.user?.dp} alt="" />
                </div>

                <div className="profile_info">
                    <div>
                        <span>
                            <i className="fas fa-user" />
                        </span>
                        <p>{auth.user?.name}</p>
                    </div>
                    <div>
                        <span>
                            <i className="fas fa-envelope"></i>
                        </span>
                        <p>{auth.user?.email}</p>
                    </div>
                    <div>
                        <span>
                            <i className="fas fa-phone" />
                        </span>
                        <p>{auth.user?.phone}</p>
                    </div>
                    <button
                        className="btn btn-primary"
                        onClick={() => setOnEdit(true)}
                    >
                        EditProfile
                    </button>
                </div>

                {onEdit && <EditProfile setOnEdit={setOnEdit} />}
            </div>
        </div>
    );
};

export default ProfileLeft;

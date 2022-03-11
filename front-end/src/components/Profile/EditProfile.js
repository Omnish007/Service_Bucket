import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { patchDataAPI } from "../../utils/fetchData";
import validUpdateProfile from "../../utils/validUpdateProfile";
import { refreshToken } from "../../redux/actions/authActions";
import { GLOBALTYPES } from "../../redux/actions/globalType";
import { imageUpload, checkImage } from "../../utils/imageUploads";
import { updateDP } from "../../redux/actions/editProfileActions";
import aos from "aos";

const EditProfile = ({ setOnEdit }) => {
    const { auth } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        aos.init();
    }, []);

    const [formData, setFormData] = useState({
        name: auth.user.name,
        phone: auth.user.phone,
    });
    const [formError, setFormError] = useState({});
    const [dp, setDp] = useState("");
    const inputFileRef = useRef();

    const changeDp = () => {
        inputFileRef.current.click();
    };

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const err = checkImage(file);
        if (err)
            return dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: err },
            });

        setDp(file);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = validUpdateProfile(formData);
        setFormError(res.errMsg);
        if (res.errLength === 0) {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
            await patchDataAPI("updateProfile", formData, auth.token);
            await dispatch(updateDP({ dp, auth }));
            dispatch(refreshToken());
            setOnEdit(false);
            dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
        }
    };

    return (
        <div className="edit_profile_container">
            <div className="edit_profile_form_container" data-aos="fade-down">
                <button
                    className="btn btn-danger edit_profile_close_btn"
                    onClick={() => setOnEdit(false)}
                >
                    &times;
                </button>

                <div className="profile_image">
                    <img
                        src={dp ? URL.createObjectURL(dp) : auth.user.dp}
                        alt=""
                    />
                    <div className="profile_change_dp">
                        <p onClick={changeDp}>Change</p>
                    </div>
                </div>

                <form>
                    <div className="form-group form-field">
                        <input
                            className="form-control"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Name"
                        />
                        <small className="form-text text-danger">
                            {formError.name ? formError.name : ""}
                        </small>
                    </div>
                    <div className="form-group form-field">
                        <input
                            className="form-control"
                            name="phone"
                            type="text"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Phone"
                        />
                        <small className="form-text text-danger">
                            {formError.phone ? formError.phone : ""}
                        </small>
                    </div>
                    <input
                        className="hidden"
                        ref={inputFileRef}
                        type="file"
                        onChange={uploadImage}
                    />

                    <button
                        disabled={
                            formData.name === "" || formData.phone === ""
                                ? true
                                : false
                        }
                        className="btn btn-lg btn-primary edit_profile_form_submitBtn"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;

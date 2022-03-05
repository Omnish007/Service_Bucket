import { GLOBALTYPES } from "./globalType";
import { getDataAPI, postDataAPI } from "../../utils/fetchData";
import valid from "../../utils/valid";

export const getEmployees = (auth) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
        const res = await getDataAPI("getEmployees", auth.token);
        console.log(res.data.employees);
        dispatch({
            type: GLOBALTYPES.EMPLOYEE,
            payload: res.data.employees,
        });
        // dispatch({
        //     type: GLOBALTYPES.ALERT,
        //     payload: {
        //         success: res.data.msg,
        //     },
        // });
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    } catch (error) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: error.response.data.msg,
            },
        });
    }
};

export const loginEmployee = (data) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

        const res = await postDataAPI("loginEmployee", data);

        dispatch({
            type: GLOBALTYPES.AUTH,
            payload: {
                token: res.data.access_token,
                user: res.data.user,
            },
        });

        localStorage.setItem("firstLogin", true);

        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                success: res.data.msg,
            },
        });
    } catch (error) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: error.response.data.msg,
            },
        });
    }
};

export const refreshTokenForEmployee = () => async (dispatch) => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

        try {
            const res = await postDataAPI("refresh_token");
            dispatch({
                type: GLOBALTYPES.AUTH,
                payload: {
                    token: res.data.access_token,
                    user: res.data.user,
                },
            });

            dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
        } catch (error) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: {
                    error: error.response.data.msg,
                },
            });
        }
    }
};

export const registerEmployee = (data) => async (dispatch) => {
    const check = valid(data);

    if (check.errLength > 0)
        return dispatch({ type: GLOBALTYPES.ALERT, payload: check.errMsg });

    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

        const res = await postDataAPI("registerEmployee", data);

        // localStorage.setItem("firstLogin", true);

        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                success: res.data.msg,
            },
        });

        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {},
        });
    } catch (error) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: error.response.data.msg,
            },
        });
    }
};

export const activateEmail = (activation_token) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

        const res = await postDataAPI("activateEmployeeAccount", {
            activation_token,
        });
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                success: res.data.msg,
            },
        });
    } catch (error) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: error.response.data.msg,
            },
        });
    }
};

export const addOrder = (ele, employee, auth) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
        const res = await postDataAPI(
            "addOrder",
            { ele, employee },
            auth.token,
        );

        console.log(res.employee);
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                success: res.data.msg,
            },
        });
    } catch (error) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: error.response.data.msg,
            },
        });
    }
};

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

export const registerEmployee = (data) => async (dispatch) => {
    const check = valid(data);

    if (check.errLength > 0)
        return dispatch({ type: GLOBALTYPES.ALERT, payload: check.errMsg });

    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

        const res = await postDataAPI("registerEmployee", data);
        const res1 = await postDataAPI("activateEmployeeAccount", data);
        // dispatch({
        //     type: GLOBALTYPES.AUTH,
        //     payload: {
        //         token: res.data.access_token,
        //         user: res.data.user,
        //     },
        // });

        // localStorage.setItem("firstLogin", true);

        // dispatch({
        //     type: GLOBALTYPES.ALERT,
        //     payload: {
        //         success: res.data.msg,
        //     },
        // });

        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { loading: false },
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

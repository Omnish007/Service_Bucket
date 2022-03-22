import { GLOBALTYPES } from "./globalType";
import { getDataAPI, postDataAPI } from "../../utils/fetchData";

export const getEmployees = (auth) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
        const res = await getDataAPI("getEmployees", auth.token);
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

export const addEmployees = (auth, data) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

        await postDataAPI("addEmployee", data, auth.token);
        const res2 = await postDataAPI("sendCredential", data, auth.token);

        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                success: res2.data.msg,
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
                error: error,
                // error: error.response.data.msg,
            },
        });
    }
};

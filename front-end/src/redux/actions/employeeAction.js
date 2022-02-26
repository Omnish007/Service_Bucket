import { GLOBALTYPES } from "./globalType";
import { getDataAPI, postDataAPI } from "../../utils/fetchData";

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

export const addEmployees = (auth, data) => async (dispatch) => {
    console.log(auth, data);
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
        const res = await postDataAPI("addEmployee", data, auth.token);
        const res2 = await postDataAPI("sendCredential", data, auth.token);
        console.log("res1", res.data);
        console.log("res2", res2.data);

        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                success: res2.data.msg,
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
};

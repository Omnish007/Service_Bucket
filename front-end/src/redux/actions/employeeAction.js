import { GLOBALTYPES } from "./globalType";
import { getDataAPI } from "../../utils/fetchData";

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

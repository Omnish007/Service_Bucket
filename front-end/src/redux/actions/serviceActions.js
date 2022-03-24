import { GLOBALTYPES } from "./globalType";
import { getDataAPI, postDataAPI } from "../../utils/fetchData";

export const getServices = () => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

        const res = await getDataAPI("getServices");

        dispatch({
            type: GLOBALTYPES.SERVICE,
            payload: [...res.data.services],
        });

        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    } catch (error) {
        if (error.response) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: {
                    error: error.response.data.msg,
                },
            });
        } else {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: {
                    error: error,
                },
            });
        }
    }
};

export const createServices = (data, auth) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

        const res = await postDataAPI("createService", data, auth.token);

        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: res.data.msg,
        });

        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    } catch (error) {
        if (error.response) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: {
                    error: error.response.data.msg,
                },
            });
        } else {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: {
                    error: error,
                },
            });
        }
    }
};

export const deleteServices = (id, auth) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

        const res = await postDataAPI("deleteService", { id }, auth.token);

        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: res.data.msg,
        });
    } catch (error) {
        if (error.response) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: {
                    error: error.response.data.msg,
                },
            });
        } else {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: {
                    error: error,
                },
            });
        }
    }
};

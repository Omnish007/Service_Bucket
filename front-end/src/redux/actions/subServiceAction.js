import { GLOBALTYPES } from "./globalType";
import { getDataAPI, postDataAPI } from "../../utils/fetchData";

export const getSubService =
    ({ id, auth }) =>
    async (dispatch) => {
        try {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

            const res = await getDataAPI(`getSubService/${id}`, auth.token);

            dispatch({
                type: GLOBALTYPES.SUBSERVICE,
                payload: res.data,
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
                        error: error.message,
                    },
                });
            }
        }
    };
export const getSubServices = (auth) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

        const res = await getDataAPI("getSubServices", auth.token);

        dispatch({
            type: GLOBALTYPES.SUBSERVICE,
            payload: res.data.subServices,
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
                    error: error.message,
                },
            });
        }
    }
};

export const createSubService = (data, auth) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

        const res = await postDataAPI("createSubService", data, auth.token);
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
                    error: error.message,
                },
            });
        }
    }
};

export const deleteSubServices = (data, auth) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

        const res = await postDataAPI("deleteSubService", data, auth.token);

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
                    error: error.message,
                },
            });
        }
    }
};

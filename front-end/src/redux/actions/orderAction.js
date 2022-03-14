import { GLOBALTYPES } from "./globalType";
import { deleteDataAPI, getDataAPI, postDataAPI } from "../../utils/fetchData";
import validFormData from "../../utils/validFormData";

export const createOrder = (data, auth) => async (dispatch) => {
    const check = validFormData(data);

    if (check.errLength > 0)
        return dispatch({ type: GLOBALTYPES.ALERT, payload: check.errMsg });

    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

        const res = await postDataAPI("createOrder", data, auth.token);

        dispatch({
            type: GLOBALTYPES.ORDER,
            payload: { success: res.data.msg, ...res.data.newOrder },
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

export const getOrders =
    ({ auth }) =>
    async (dispatch) => {
        try {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

            const res = await getDataAPI("getOrders", auth.token);

            if (auth.user.role !== "2") {
                dispatch({
                    type: GLOBALTYPES.ORDER,
                    payload: [...res.data.order],
                });
            } else if (auth.user.role === "2")
                dispatch({
                    type: GLOBALTYPES.ORDER,
                    payload: [...res.data.order],
                });

            dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
        } catch (error) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: {
                    error: error.response.data.msg,
                },
            });
            console.log(error.message);
        }
    };

export const getAllOrders =
    ({ auth }) =>
    async (dispatch) => {
        try {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

            const res = await getDataAPI("getAllOrders", auth.token);

            dispatch({
                type: GLOBALTYPES.ORDER,
                payload: [...res.data.orders],
            });

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

export const deleteOrder =
    ({ id, auth }) =>
    async (dispatch) => {
        try {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

            await deleteDataAPI(`deleteOrder/${id}`, auth.token);

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

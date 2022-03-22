import { GLOBALTYPES } from "./globalType";
import { getDataAPI } from "../../utils/fetchData";

export const getSubService =
    ({ id, auth }) =>
    async (dispatch) => {
        try {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

            const res = await getDataAPI(`getSubService/${id}`, auth.token);

            const newArr = { ...res.data.subServices, sName: res.data.sName };
            dispatch({
                type: GLOBALTYPES.SUBSERVICE,
                payload: { ...newArr },
            });

            dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
        } catch (error) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: {
                    error: error,
                    // error: error.response.data.msg
                },
            });
        }
    };

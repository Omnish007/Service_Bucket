import { GLOBALTYPES } from "./globalType";
import { getDataAPI } from "../../utils/fetchData";

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
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: error.response.data.msg,
            },
        });
    }
};

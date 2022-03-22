import { GLOBALTYPES } from "./globalType";
import { getDataAPI } from "../../utils/fetchData";

export const getServices = () => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

        const res = await getDataAPI("getServices");
        console.log(res);

        dispatch({
            type: GLOBALTYPES.SERVICE,
            payload: [...res.data.services],
        });

        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    } catch (error) {
        console.log(error);
        console.log(error.response);
        // if (error.response) {
        //     dispatch({
        //         type: GLOBALTYPES.ALERT,
        //         payload: {
        //             error: error.response.data.msg,
        //         },
        //     });
        // }
        // else {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: error.message,
            },
        });
        // }
    }
};

import { GLOBALTYPES } from "./globalType"
import { getDataAPI } from "../../utils/fetchData"

export const getServices = (token) => async (dispatch) => {
    try {

        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })

        const res = await getDataAPI("getServices",token)

        dispatch({
            type: GLOBALTYPES.SERVICE,
            payload: {
                service: res.data.services
            }
        })

        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } })
        

    } catch (error) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: error.response.data.msg
            }
        })
    }
}
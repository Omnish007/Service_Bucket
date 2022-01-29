import { GLOBALTYPES } from "./globalType"
import { getDataAPI, postDataAPI } from "../../utils/fetchData"
import validFormData from "../../utils/validFormData"




export const createOrder = (data, auth) => async (dispatch) => {
    
    const check = validFormData(data)

        if(check.errLength > 0)
            return dispatch({type: GLOBALTYPES.ALERT, payload: check.errMsg})

    try {
            dispatch({type: GLOBALTYPES.ALERT, payload: {loading:true}})
            
            const res = await postDataAPI("createOrder", data, auth.token)


            dispatch({type: GLOBALTYPES.ORDER, payload: {success:res.data.msg, ...res.data.newOrder}})

            dispatch({type: GLOBALTYPES.ALERT, payload: {loading:false}})
           

    }catch (error) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: error.response.data.msg
            }
        })
    }
}

export const getOrders = ({auth}) => async (dispatch) => {
    
    try {
            dispatch({type: GLOBALTYPES.ALERT, payload: {loading:true}})
            
            const res = await getDataAPI("getOrders", auth.token)

            dispatch({type: GLOBALTYPES.ORDER, payload: [...res.data.order]})

            dispatch({type: GLOBALTYPES.ALERT, payload: {loading:false}})
           

    }catch (error) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: error.response.data.msg
            }
        })
    }
}
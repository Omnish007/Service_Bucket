import { GLOBALTYPES } from "./globalType"
import { postDataAPI } from "../../utils/fetchData"
import validFormData from "../../utils/validFormData"




export const form = (data, auth) => async (dispatch) => {
    
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
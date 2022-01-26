import { GLOBALTYPES } from "./globalType"
import { postDataAPI } from "../../utils/fetchData"
import valid from "../../utils/valid"




export const form = (data) => async (dispatch) => {
    
    const check = valid(data)

        if(check.errLength > 0)
            return dispatch({type: GLOBALTYPES.ALERT, payload: check.errMsg})

    try {
            dispatch({type: GLOBALTYPES.ALERT, payload: {loading:true}})

            const res = await postDataAPI("register", data)
            dispatch({
                type: GLOBALTYPES.AUTH,
                payload: {
                    token: res.data.access_token,
                    user: res.data.user
                }
            })
    
            localStorage.setItem("firstLogin", true)
    
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: {
                    success: res.data.msg
                }
            })

    }catch (error) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: error.response.data.msg
            }
        })
    }
}
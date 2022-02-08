import { patchDataAPI } from "../../utils/fetchData"
import { imageUpload } from "../../utils/imageUploads"
import { GLOBALTYPES } from "./globalType"

export const updateDP = ({dp, auth}) => async (dispatch) => {
    try {
        const res =await imageUpload([dp])
        const url = res[0].url
        await patchDataAPI("updateDp", {url:url}, auth.token)
    }
    catch(err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}
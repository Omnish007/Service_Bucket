import { combineReducers } from "redux"
import auth from "./authReducer"
import alert from "./alertReducer"
import service from "./serviceReducer"


export default combineReducers({
    auth,
    alert,
    service
})
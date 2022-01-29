import { combineReducers } from "redux"
import auth from "./authReducer"
import alert from "./alertReducer"
import service from "./serviceReducer"
import subService from "./subServiceReducer"
import order from "./orderReducer"


export default combineReducers({
    auth,
    alert,
    service,
    subService,
    order
})
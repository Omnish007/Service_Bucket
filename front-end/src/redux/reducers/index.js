import { combineReducers } from "redux"
import auth from "./authReducer"
import alert from "./alertReducer"
import service from "./serviceReducer"
import subService from "./subServiceReducer"
import serviceForm from "./serviceFormReducer"


export default combineReducers({
    auth,
    alert,
    service,
    subService,
    serviceForm
})
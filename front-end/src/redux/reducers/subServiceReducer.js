import { GLOBALTYPES } from "../actions/globalType"

const initialState = {}

const subServiceReducer = (state = initialState, action) => {
    switch(action.type){

        case GLOBALTYPES.SUBSERVICE:
            return action.payload

        default:
            return state;
    }
}

export default subServiceReducer
import { GLOBALTYPES } from "../actions/globalType"

const initialState = {}

const serviceFormReducer = (state = initialState, action) => {
    switch(action.type){

        case GLOBALTYPES.AUTH:
            return action.payload;

        default:
            return state;
    }
}

export default serviceFormReducer
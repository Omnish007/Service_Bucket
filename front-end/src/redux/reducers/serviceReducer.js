import { GLOBALTYPES } from "../actions/globalType";

const initialState = [];

const serviceReducer = (state = initialState, action) => {
    switch (action.type) {
        case GLOBALTYPES.SERVICE:
            return action.payload;

        default:
            return state;
    }
};

export default serviceReducer;

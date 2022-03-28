import { GLOBALTYPES } from "../actions/globalType";

const initialState = [];

const serviceFormReducer = (state = initialState, action) => {
    switch (action.type) {
        case GLOBALTYPES.ORDER:
            console.log(action.payload);
            return [action.payload];

        default:
            return state;
    }
};

export default serviceFormReducer;

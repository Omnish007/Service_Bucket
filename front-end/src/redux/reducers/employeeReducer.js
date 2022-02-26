import { GLOBALTYPES } from "../actions/globalType";

const initialState = {};

const employeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case GLOBALTYPES.EMPLOYEE:
            return action.payload;

        default:
            return state;
    }
};

export default employeeReducer;

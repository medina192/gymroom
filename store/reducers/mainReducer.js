import { types } from '../types/types';

const initialState = {
    user: 'redux perron'
}

export const mainReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.saveUser:
            return{
                user: action.payload.user
            }
        break;
    
        default:
            return state;
        break;
    }
}


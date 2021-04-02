import { types } from '../types/types';

const initialState = {
    user: '',
    trainer: '',
    T_trainer: '',
    T_user: '',
    subRoutine: {},
    subCategorie: {}
}

export const mainReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.saveUser:
            return{
                ...state,
                user: action.payload.user
            }
        case types.saveTrainer:
            return{
                ...state,
                trainer: action.payload.trainer
            }
        case types.T_saveTrainer:
            return{
                ...state,
                T_trainer: action.payload.T_trainer
            }
        case types.T_saveUser:
            return{
                ...state,
                T_user: action.payload.T_user
            }
        case types.saveSubCategorie:
            return{
                ...state,
                subCategorie: action.payload.subCategorie
            }
        case types.saveSubRoutine:
            return{
                ...state,
                subRoutine: action.payload.subRoutine
            }
        case types.currentRoutine:
            return{
                ...state,
                currentRoutine: action.payload.currentRoutine
            }    
        break;
    
        default:
            return state;
        break;
    }
}


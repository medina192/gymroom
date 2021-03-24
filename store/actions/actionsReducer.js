import { types } from '../types/types';

export const saveUser = (user) => {

    return {
        type: types.saveUser,
        payload: {
            user
        }
    }
}

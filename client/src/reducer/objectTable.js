import {SET_OBJECT_TABLE} from '../action/index';

export const objectTable = (state = {}, action) => {
    switch(action.type) {
        case SET_OBJECT_TABLE:
            return  action.value//da valor a state del store
        default:
            return state;
    }
}
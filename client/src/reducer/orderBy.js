import {SET_ORDER_BY} from './../action/index';

export const orderBy = (state = {}, action) => {
    switch(action.type) {
        case SET_ORDER_BY:
            return  action.value//da valor a state del store
        default:
            return state;
    }
}
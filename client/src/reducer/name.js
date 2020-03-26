import {SET_NAME} from './../action/index';

export const name = (state = {}, action) => {
    switch(action.type) {
        case SET_NAME:
            return  action.value//da valor a state del store
        default:
            return state;
    }
}
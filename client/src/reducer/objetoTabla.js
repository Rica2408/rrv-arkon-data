import {SET_OBJETO_TABLA} from './../action/index';

export const objetoTabla = (state = {}, action) => {
    switch(action.type) {
        case SET_OBJETO_TABLA:
            return  action.value//da valor a state del store
        default:
            return state;
    }
}
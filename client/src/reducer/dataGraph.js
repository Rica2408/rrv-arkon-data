import {SET_DATA_GRAPH} from './../action/index';

export const dataGraph = (state = {}, action) => {
    switch(action.type) {
        case SET_DATA_GRAPH:
            return  action.value//da valor a state del store
        default:
            return state;
    }
}
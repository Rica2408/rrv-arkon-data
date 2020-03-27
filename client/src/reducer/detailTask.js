import {SET_DETAIL_TASK} from './../action/index';

export const detailTask = (state = {}, action) => {
    switch(action.type) {
        case SET_DETAIL_TASK:
            return  action.value//da valor a state del store
        default:
            return state;
    }
}
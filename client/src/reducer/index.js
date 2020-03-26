import { combineReducers } from 'redux';
import { objetoTabla } from './objetoTabla';
import { orderBy } from './orderBy';


export default combineReducers({
    objetoTabla,
    orderBy
});
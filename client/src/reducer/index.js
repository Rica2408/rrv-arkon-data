import { combineReducers } from 'redux';
import { objetoTabla } from './objetoTabla';
import { orderBy } from './orderBy';
import { name } from './name';
import { dataGraph } from './dataGraph';


export default combineReducers({
    objetoTabla,
    orderBy,
    name,
    dataGraph,
});
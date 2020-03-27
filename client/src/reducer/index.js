import { combineReducers } from 'redux';
import { objetoTabla } from './objetoTabla';
import { orderBy } from './orderBy';
import { name } from './name';
import { dataGraph } from './dataGraph';
import { detailTask } from './detailTask';


export default combineReducers({
    objetoTabla,
    orderBy,
    name,
    dataGraph,
    detailTask,
});
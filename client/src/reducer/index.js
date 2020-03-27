import { combineReducers } from 'redux';
import { objectTable } from './objectTable';
import { orderBy } from './orderBy';
import { name } from './name';
import { dataGraph } from './dataGraph';
import { detailTask } from './detailTask';


export default combineReducers({
    objectTable,
    orderBy,
    name,
    dataGraph,
    detailTask,
});
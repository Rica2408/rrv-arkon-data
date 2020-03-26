import  {createStore} from 'redux';
import reducer from './../reducer';

const initialState = {
    objeto: '',
    orderBy: 'name',
}

export const store = createStore( reducer,initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    
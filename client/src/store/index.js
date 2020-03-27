import  {createStore} from 'redux';
import reducer from './../reducer';

const initialState = {
    objeto: '',
    orderBy: 'name',
    name:'',
    dataGraph: {},
    detailTask: {
        status:false,
        _id:'',
        name:'',
        description:'',
        time:'',
        day:'',
        date:'',
        __v:'',
        timeRemain:'',
    }
}

export const store = createStore( reducer,initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    
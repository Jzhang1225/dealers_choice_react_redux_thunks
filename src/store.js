import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import axios from 'axios'

const LOAD = 'LOAD';
const ADD = 'ADD';
const DESTROY = 'DESTROY'
const RESET = 'RESET'
const VIEW_CHANGE = 'VIEW_CHANGE'

const viewReducer = ( state = '', action) =>{
    if (action.type === VIEW_CHANGE){
        return action.view
    }
    return state
}
const peopleReducer = ( state = [], action ) =>{
    if (action.type === LOAD){
        state = action.people
    };
    if (action.type === ADD){
        state = [...state, action.person]
    };
    if (action.type === DESTROY){
        state = state.filter(person => person !== action.person)
    };
    if (action.type === RESET){
        state = action.people
    };
    return state
}

const Reducer = combineReducers({
    people: peopleReducer,
    view: viewReducer,
})

const getPeople =()=>{
    return async (dispatch) =>{
        const people = (await axios.get('/api/people')).data;
        dispatch({
            type: LOAD,
            people
        })
    }
};

const addPerson =()=>{
    return async (dispatch) =>{
        const person = (await axios.post('/api/people')).data;
        dispatch({
            type: ADD,
            person
        })
    }
};

const deletePerson =(person)=>{
    return async (dispatch) =>{
        await axios.delete(`/api/people/${person.id}`);
        dispatch({
            type: DESTROY,
            person
        })
    }
};

const reset =()=>{
    return async (dispatch) =>{
        const people = (await axios.get('/api/people/reset')).data;
        dispatch({
            type: RESET,
            people
        })
    }
};

const store = createStore(Reducer, applyMiddleware(thunk))

export default store;
export {
    getPeople,
    addPerson,
    deletePerson,
    reset,
}
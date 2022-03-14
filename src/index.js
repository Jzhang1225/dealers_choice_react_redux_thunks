import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect, Provider } from 'react-redux';
import LoadPeople from './LoadPeople';
import store, { getPeople, addPerson } from './store';

class _App extends Component {
    async componentDidMount(){
        this.props.loadPeople()
    }
    render(){
        return(
        <LoadPeople />
        )
    }
}

const App = connect((state)=>{
    return { people: state }
}, (dispatch) => {
    return {
        loadPeople: ()=>{
            dispatch(getPeople())
        }
    }
})(_App);

render(<Provider store={ store }><App /></Provider>, document.querySelector('#root'));
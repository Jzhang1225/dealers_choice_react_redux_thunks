import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect, Provider } from 'react-redux';
import LoadPeople from './LoadPeople';
import store, { getPeople } from './store';
import Nav from './nav'

class _App extends Component {
    componentDidMount(){
        const { loadPeople, viewChange } = this.props
        loadPeople()
        window.addEventListener('hashchange', ()=> {
            viewChange(window.location.hash.slice(1));
        })
        viewChange(window.location.hash.slice(1));
    }
    render(){
        return(
            <div>
                <h1>Get within 5 years of total age of 500 to win a prize!</h1>
                <Nav />
                <LoadPeople />
            </div>
        )
    }
}

const App = connect((state)=>{
    return { people: state }
}, (dispatch) => {
    return {
        loadPeople: ()=>{
            dispatch(getPeople())
        },
        viewChange: (view)=> dispatch({ type: 'VIEW_CHANGE', view })
    }
})(_App);

render(<Provider store={ store }><App /></Provider>, document.querySelector('#root'));
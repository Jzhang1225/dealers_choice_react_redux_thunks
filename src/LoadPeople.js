import React from 'react';
import { connect } from 'react-redux';
import { addPerson, deletePerson, reset } from './store';

const _loadPeople = (props) =>{
    const { create, destroy, startOver, view } = props
    let people = props.people
    const totalAge = people.reduce((acc, person)=>{
        return acc + person.age
    },0)
    if (Math.abs(totalAge - 500) <= 5){
        return <div>
                <h1>You are very smart and people, including me, think that you are a great person!</h1>
                <button onClick={()=> startOver()}>Start over and play again?</button>
            </div>
    }
    if (view === 'adults') {
        people = people.filter(people => people.age >= 18)
    }
    if (view === 'younglings') {
        people = people.filter(people => people.age <= 18)
    }
    return(
    <div>
        <h2>Total age is {totalAge}</h2>
        <button onClick={()=>create()}>Create a person</button>
        {people.map(person =>{
            return (
                <div key= {person.id}> 
                    {person.name} is {person.age} years old.
                    <span></span>
                    <button onClick={()=>destroy(person)}>Delete Person</button>
                </div>
            )
        })}
    </div>
    )
};

const LoadPeople = connect(state => state, (dispatch) => {
    return {
        create: ()=>{
            dispatch(addPerson())
        },
        destroy: (person)=>{
            dispatch(deletePerson(person))
        },
        startOver: ()=>{
            dispatch(reset())
        },
    }
})(_loadPeople)

export default LoadPeople;
import React from 'react';
import { connect } from 'react-redux';
import { addPerson, deletePerson, reset } from './store';

const _loadPeople = (props) =>{
    const { people, create, destroy, startOver } = props
    const totalAge = people.reduce((acc, person)=>{
        return acc + person.age
    },0)
    if (Math.abs(totalAge - 500) <= 10){
        return <div>
                <h1>You are very smart and people, including me, think that you are a great person!</h1>
                <button onClick={()=> startOver()}>Start over and play again?</button>
            </div>
    }
    return(
    <div>
        <h1>Get Within 10 of Total Age of 500 to Win a Prize</h1>
        <h2>Total Age is {totalAge}</h2>
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

const LoadPeople = connect((state)=>{
    return { people: state }
}, (dispatch) => {
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
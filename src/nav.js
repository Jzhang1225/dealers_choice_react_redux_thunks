import React from 'react';
import { connect } from 'react-redux';

const Nav = (props)=> {
  const { people } = props
  const adults = people.filter(people => people.age >= 18);
  const younglings = people.filter(people => people.age < 18);
  return (
    <nav >
      <a href='#'> All ({ people.length })</a>
      <a href='#adults'> Adults ({ adults.length})</a>
      <a href='#younglings'> Younglings ({ younglings.length })</a>
    </nav>
  );
};


export default connect(state => state )(Nav);
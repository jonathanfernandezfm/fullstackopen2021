import React from 'react';
import Person from './Person';

const Persons = ({ persons, handleRemove }) => {
	return (
		<>
			{persons.map((person) => (
				<Person key={person.id} person={person} handleRemove={handleRemove} />
			))}
		</>
	);
};

export default Persons;

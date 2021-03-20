import React from 'react';

const Person = ({ person, handleRemove }) => {
	return (
		<div>
			{person.name} {person.number}{' '}
			<button
				onClick={() => {
					handleRemove(person);
				}}
			>
				delete
			</button>
		</div>
	);
};

export default Person;

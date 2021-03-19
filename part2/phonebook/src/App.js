import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [search, setSearch] = useState('');

	useEffect(() => {
		axios.get('http://localhost:3001/persons').then((response) => {
			setPersons(response.data);
		});
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();

		if (persons.find((person) => person.name === newName))
			return window.alert(`${newName} is already added to phonebook`);

		const copy = [...persons];
		copy.push({ name: newName, number: newNumber });
		setPersons(copy);
		setNewName('');
		setNewNumber('');
	};

	const handleChangeName = (event) => {
		setNewName(event.target.value);
	};

	const handleChangeNumber = (event) => {
		setNewNumber(event.target.value);
	};

	const handleChangeSearch = (event) => {
		setSearch(event.target.value);
	};

	const personsToShow = persons.filter((person) => person.name.toLowerCase().includes(search.toLowerCase()));

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter search={search} handleChangeSearch={handleChangeSearch} />
			<h3>add a new</h3>
			<PersonForm
				handleSubmit={handleSubmit}
				newName={newName}
				handleChangeName={handleChangeName}
				newNumber={newNumber}
				handleChangeNumber={handleChangeNumber}
			/>
			<h3>Numbers</h3>
			<Persons persons={personsToShow} />
		</div>
	);
};

export default App;

import React, { useState, useEffect } from 'react';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter';
import personsService from './services/persons';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [search, setSearch] = useState('');

	useEffect(() => {
		personsService.getAll().then((data) => setPersons(data));
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();

		const existingPerson = persons.find((person) => person.name === newName);
		if (existingPerson) {
			if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
				personsService.update(existingPerson.id, { ...existingPerson, number: newNumber }).then((data) => {
					setPersons(persons.map((person) => (person.id !== existingPerson.id ? person : data)));
					setNewName('');
					setNewNumber('');
				});
			}
		} else {
			personsService
				.create({
					name: newName,
					number: newNumber,
				})
				.then((data) => {
					setPersons(persons.concat(data));
					setNewName('');
					setNewNumber('');
				});
		}
	};

	const handleRemove = (p) => {
		if (window.confirm(`Delete ${p.name}?`))
			personsService.remove(p.id).then((response) => {
				setPersons(persons.filter((person) => person.id !== p.id));
			});
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
			<Persons persons={personsToShow} handleRemove={handleRemove} />
		</div>
	);
};

export default App;

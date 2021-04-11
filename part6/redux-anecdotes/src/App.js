import React from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdotesList from './components/AnecdotesList';
import FilterForm from './components/FilterForm';
import Notification from './components/Notification';

const App = () => {
	return (
		<div>
			<h2>Anecdotes</h2>
			<FilterForm />
			<Notification />
			<AnecdotesList />
			<AnecdoteForm />
		</div>
	);
};

export default App;

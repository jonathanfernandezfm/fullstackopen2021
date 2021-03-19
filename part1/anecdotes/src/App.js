import React, { useState } from 'react';

const Button = ({ text, handleClick }) => <button onClick={handleClick}>{text}</button>;

const App = () => {
	const anecdotes = [
		'If it hurts, do it more often',
		'Adding manpower to a late software project makes it later!',
		'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
		'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
		'Premature optimization is the root of all evil.',
		'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
	];

	const [selected, setSelected] = useState(0);
	const [points, setPoints] = useState(Array.apply(null, new Array(10)).map(Number.prototype.valueOf, 0));

	const handleVote = () => {
		const copy = [...points];
		copy[selected]++;
		setPoints(copy);
	};

	return (
		<div>
			<h1>Anecdote of the day</h1>
			<p>{anecdotes[selected]}</p>
			<p>{points[selected]}</p>
			<Button
				text={'vote'}
				handleClick={() => {
					handleVote();
				}}
			/>
			<Button
				text={'next anecdote'}
				handleClick={() => {
					setSelected(Math.floor(Math.random() * anecdotes.length));
				}}
			/>
			<h1>Anecdote with most votes</h1>
			<p>{anecdotes[points.indexOf(Math.max(...points))]}</p>
		</div>
	);
};

export default App;

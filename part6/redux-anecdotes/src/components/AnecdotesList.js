import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer';
import { removeNotification, setNotification } from '../reducers/notificationReducer';

let timeout;

const AnecdotesList = () => {
	const anecdotes = useSelector((state) => {
		const sorted = state.anecdotes.sort((a, b) => {
			if (a.votes < b.votes) return 1;
			if (a.votes > b.votes) return -1;
			else return 0;
		});
		return sorted.filter((a) => a.content.toLowerCase().includes(state.filter.toLowerCase()));
	});
	const dispatch = useDispatch();

	const handleVote = (anecdote) => {
		dispatch(vote(anecdote.id));
		dispatch(setNotification(anecdote.content));
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			dispatch(removeNotification());
		}, 5000);
	};

	return (
		<div>
			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => handleVote(anecdote)}>vote</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default AnecdotesList;

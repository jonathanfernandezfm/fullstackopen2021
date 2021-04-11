import React from 'react';
import { useDispatch } from 'react-redux';
import { filter } from '../reducers/filterReducer';

const FilterForm = () => {
	const dispatch = useDispatch();

	const handleChange = (event) => {
		event.preventDefault();
		const filterValue = event.target.value;
		console.log(event.target.value);

		dispatch(filter(filterValue));
	};

	const style = {
		marginBottom: 10,
	};

	return (
		<div style={style}>
			<label htmlFor="filter">filter</label>
			<input name="filter" onChange={handleChange} />
		</div>
	);
};

export default FilterForm;

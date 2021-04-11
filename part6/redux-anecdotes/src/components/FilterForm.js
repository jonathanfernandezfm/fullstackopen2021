import React from 'react';
import { filter } from '../reducers/filterReducer';
import { connect } from 'react-redux';

const FilterForm = (props) => {
	const handleChange = (event) => {
		event.preventDefault();
		const filterValue = event.target.value;

		props.filter(filterValue);
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

const mapDispatchToProps = {
	filter,
};

const ConnectedFilter = connect(null, mapDispatchToProps)(FilterForm);
export default ConnectedFilter;

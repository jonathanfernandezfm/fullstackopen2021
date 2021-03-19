import React from 'react';

const Filter = ({ search, handleChangeSearch }) => {
	return (
		<div>
			filter shown with: <input value={search} onChange={handleChangeSearch} />
		</div>
	);
};

export default Filter;

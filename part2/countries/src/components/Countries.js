import React from 'react';

const Countries = ({ countriesToShow, handleViewClick }) => {
	return (
		<div>
			{countriesToShow.length >= 100 && <p>Too many matches, specify another filter</p>}
			{countriesToShow.length < 100 &&
				countriesToShow.map((country) => (
					<div key={country.numericCode}>
						{country.name}
						<button onClick={() => handleViewClick(country)}>show</button>
					</div>
				))}
		</div>
	);
};

export default Countries;

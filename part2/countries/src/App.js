import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Country from './components/Country';
import Countries from './components/Countries';

const App = () => {
	const [countries, setCountries] = useState([]);
	const [country, setCountry] = useState(undefined);
	const [weather, setWeather] = useState(undefined);
	const [search, setSearch] = useState('');

	useEffect(() => {
		axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
			setCountries(response.data);
		});
	}, []);

	const handleSearchChange = (event) => setSearch(event.target.value);
	const handleViewClick = (country) => {
		setCountry(country);
		setWeather(undefined);
		axios
			.get(
				`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`
			)
			.then((response) => {
				setWeather(response.data);
			});
	};

	const countriesToShow = countries.filter((country) => country.name.toLowerCase().includes(search.toLowerCase()));

	return (
		<div>
			<div>
				find countries: <input value={search} onChange={handleSearchChange} />
			</div>
			<Countries countriesToShow={countriesToShow} handleViewClick={handleViewClick} />
			<Country country={country} weather={weather} />
		</div>
	);
};

export default App;

import React from 'react';

const Country = ({ country, weather }) => {
	return (
		<div>
			{country && (
				<div>
					<h1>{country.name}</h1>
					<div>capital {country.capital}</div>
					<div>population {country.population}</div>
					<h2>languages</h2>
					<ul>
						{country.languages.map((language) => (
							<li key={language.name}>{language.name}</li>
						))}
					</ul>
					<img style={{ width: '140px' }} src={country.flag} alt={'Country flag'}></img>
					{weather && (
						<div>
							<h2>Weather in {country.capital}</h2>
							<p>
								<b>temperature:</b> {weather.current.temperature}
							</p>
							<img
								style={{ width: '140px' }}
								src={weather.current.weather_icons[0]}
								alt={'Weather icon'}
							></img>
							<p>
								<b>wind:</b> {weather.current.wind_speed} mph {weather.current.wind_dir}{' '}
								{weather.current.wind_degree}º
							</p>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default Country;

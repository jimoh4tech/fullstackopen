import React from "react";

const Country = ({showCountries, weather}) => {


    return (
        <div>
          <h2>{showCountries.name}</h2>
          <p>capital {showCountries.capital}</p>
          <p>population {showCountries.population}</p>
          <h4>languages</h4>
          <ul>
            {showCountries.languages.map(l => <li key={l.name}>{l.name}</li>)}
          </ul>
          <img src={showCountries.flags.png} width={100} height={100}/>
          <h4>Weather in {weather.name}</h4>
          <p><b>temperature: </b>{weather.main.temp} Kelvin</p>
          <p><b>wind: </b>{weather.wind.speed} mph direction SSW</p>
        </div>
    )
}


export default Country
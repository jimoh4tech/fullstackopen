import React, {useState, useEffect} from "react";
import axios from "axios"
import Country from "./components/Country";
import Countries from "./components/Countries";



const App = () => {

  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => {
        const data = response.data
        console.log(data)
        setCountries(data)

        axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${data[0].name}&appid=${process.env.REACT_APP_API_KEY}`)
        .then(response => {
          console.log(response.data)
          setWeather(response.data)
        })
      })
  }, [])

  const handleSearchChange = event => setSearch(event.target.value)

  const showCountries = search === '' 
  ? countries
  : countries.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
  console.log(showCountries)

  const renderCountry = () => {
    
    return (
      <div>{
        showCountries.length === 0 
        ? <p>loading...</p>
        :showCountries.length > 10
        ? <p>Too many matches, specify another</p>
        : showCountries.length > 1
        ? <Countries showCountries={showCountries} weather={weather}/>
        : <Country showCountries={showCountries[0]} weather={weather}/>
      }</div>
    )
  }

  return (
    <div>
      <div>
        find countries <input 
          value={search}
          onChange={handleSearchChange}
        />
      </div>
        {renderCountry()}
    </div>
  )
}
export default App;

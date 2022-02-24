import React, { useState } from "react";
import Country from "./Country";

const Countries = ({showCountries, weather}) => {

    const [show, setShow] = useState({})

    const handleClick = (event) => {
        const country = showCountries.find(c => c.name === event.target.value)
        console.log(event.target.value, country)
        setShow(country)
    }
    

    return (
        <>
        {Object.keys(show).length === 0
        ? showCountries.map(c => 
            <div key={c.name}>
                {c.name} 
                <button
                    value={c.name}
                    onClick={handleClick}
                >show</button>
            </div>
        
        )
        : <Country showCountries={show} weather={weather}/>}
        </>
    )
}

export default Countries
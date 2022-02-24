import React from "react";

const Persons = ({person, handleDelete}) => {
    const {name, number, id} = person
    return (
<p>{`${name} ${number}`}<button value={id} onClick={handleDelete}>delete</button></p>
)}

export default Persons

import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Notification from './components/Notification'


const App = () => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [persons, setPersons] = useState([])
  const [message, setMessage] = useState(null)
  const [color, setColor] = useState('green') 

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(response => setPersons(response))
  }, [])

  
  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    const n = persons.map((p) => p.name)
    if(n.includes(personObject.name))
      if(window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)){
        const p = persons.find(p => p.name === personObject.name)
        personService
          .update(p.id, personObject)
          .then(res => setPersons(persons.map(per => per.id !== p.id ? per : res)))
          .catch(err => {
            setColor('red')
            setMessage(`Information of ${p.name} has already been removed from server`)
            setTimeout(() => setMessage(null), 5000)
          })

          setNewName('')
          setNewNumber('')
          setColor('green')
          setMessage(`Updated ${p.name}`)
          setTimeout(() => setMessage(null), 5000)
          return
      }

      personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
        setColor('green')
        setMessage(`Added ${response.name}`)
        setTimeout(() => setMessage(null), 5000)
      })
      .catch(error => {
        setColor('red')
        setMessage(`${error.response.data.error}`)
        setTimeout(() => setMessage(null), 5000)
      })
    
    
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
  }

  const handleDelete = event => {
    const per = persons.find(p => p.id === event.target.value)
    // console.log(event.target.value, per)
    if(window.confirm(`Delete ${per.name} ?`)){
      personService
        .remove(per)
        .then(res => setPersons(persons.filter(p => p.id !== per.id)))

        setColor('green')
        setMessage(`Deleted ${per.name}`)
        setTimeout(() => setMessage(null), 5000)
    }
    
  }

  const personsToShow = search === '' 
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))


  return (
    <div>
      <h1>Phonebook</h1>

      <Notification color={color} message={message}/>
      <Filter value={search} onChange={handleSearchChange}/>

      <h1>add a new</h1>
      <PersonForm 
        addName={addName}
        newName={newName} 
        newNumber={newNumber}
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      {personsToShow.map((p) => 
        <Persons 
          key={p.id} 
          person={p}
          handleDelete={handleDelete}
        />)}
    </div>
  )
}

export default App
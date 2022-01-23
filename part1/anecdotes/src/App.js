import React, { useState } from 'react'

const Header = (props) => <h1>{props.value}</h1>

const Display = (props) => <div>{props.text}</div>

const Button = (props) => {
  return (
    <button onClick={props.handleClick} >{props.text}</button>
  )
}




const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

   
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(new Array(7).fill(0))
  const [maxVote, setMaxVote] = useState(0);
  
  const handleVote = () => {
    const newVote = [...vote]
    newVote[selected] += 1
    setVote(newVote)

    const max = Math.max(...newVote)
    setMaxVote(newVote.findIndex(v => v === max))
  }
  
  return (
    <div>
      <Header value="Anecdote of the day"/>
      <Display text={anecdotes[selected]}/>
      <Display text={"has " + vote[selected] + " votes"}/>
      <Button text="vote" handleClick={handleVote}/>
      <Button text="next ancedote" handleClick={() => setSelected(Math.round(Math.random() * (anecdotes.length - 1)))} />
      <Header value="Anecdote with most votes"/>
      <Display text={anecdotes[maxVote]}/>
      <Display text={"has " + vote[maxVote] + " votes"}/>
    </div>
  )
}

export default App
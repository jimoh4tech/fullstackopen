import { useState } from 'react'
import { useQuery, useMutation} from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from './queries'
import Select from 'react-select'

const Authors = (props) => {
  const [born, setBorn] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)


  const [ changeBorn ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS}]
  })

  
  const handleUpdate = event => {
    event.preventDefault()
   
    const name = selectedOption.label
    changeBorn({ variables: {name, born } })
    setSelectedOption(null)
    setBorn('')
  }
  
  const result = useQuery(ALL_AUTHORS)
  
  if (!props.show) {
    return null
  }
  
  if(!result.data) {
    return (
      <div>loading...</div>
      )
    }
    const authors = result.data.allAuthors
    const options = authors.map(a => {
      return {
        value: a.name,
        label: a.name
      }
    })

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>set birthyear</h2>
      <form onSubmit={handleUpdate}>
        <Select 
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
        />
        <div>
          born 
          <input 
            value={born} 
              onChange={({ target}) => setBorn(Number(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors

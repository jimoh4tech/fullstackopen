import { useQuery } from '@apollo/client'
import { ALL_BOOKS, FILTER_BOOK } from './queries'
import { useEffect, useState } from 'react'



const Books = (props) => {
  const [genre, setGenre] = useState('')
  const [filter, setFilter] = useState([])

  const result = useQuery(ALL_BOOKS)
  const filterBook = useQuery(FILTER_BOOK, {
    variables: { genre }
  })

  useEffect(() => {
    filterBook.data && setFilter(filterBook.data.filterBook)
  }, [filterBook.data, filter])

  if (!props.show) {
    return null
  }

  if(!result.data) {
    return (
      <div>loading...</div>
    )
  }

  
  const books = result.data.allBooks
  let genres = new Set(books.flatMap(book => book.genres))
  genres = [...genres]
  
  const selectedBooks = genre === ''  || filter === []
  ? books
  : filter
 

  return (
    <div>
      <h2>books</h2>
      {genre && <p>in genre <b>{genre}</b></p>}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {selectedBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {genres.map(g => 
        <button onClick={() => setGenre(g)} key={g}>{g}</button>)}
      <button onClick={() => setGenre('')}>all genres</button>
    </div>
  )
}

export default Books
